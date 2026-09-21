import { NextResponse } from "next/server";
import { describeTelegramFailure, escapeHtml, sendTelegramMessage } from "@/lib/telegram";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_RE = /^[+\d][\d\s()-]{6,19}$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }

    // Honeypot — real users never see this hidden field. Reply 200 so bots move on.
    if (String(body.company ?? "").trim() !== "") {
      return NextResponse.json({ ok: true });
    }

    const name = String(body.name ?? "").trim();
    const mobile = String(body.mobile ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length > 100) {
      return NextResponse.json({ ok: false, error: "Please provide your name." }, { status: 400 });
    }
    if (!mobile || !MOBILE_RE.test(mobile)) {
      return NextResponse.json(
        { ok: false, error: "Please provide a valid mobile number." },
        { status: 400 },
      );
    }
    if (email && !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please provide a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 2000) {
      return NextResponse.json(
        { ok: false, error: "Message must be between 10 and 2000 characters." },
        { status: 400 },
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      console.error("[contact] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID");
      return NextResponse.json(
        { ok: false, error: "Notifications are not configured. Please email me directly." },
        { status: 500 },
      );
    }

    const text = [
      "📬 <b>New Portfolio Inquiry</b>",
      `👤 <b>Name:</b> ${escapeHtml(name)}`,
      `📱 <b>Mobile:</b> ${escapeHtml(mobile)}`,
      `📧 <b>Email:</b> ${escapeHtml(email || "Not provided")}`,
      `💬 <b>Message:</b> ${escapeHtml(message)}`,
    ].join("\n");

    const res = await sendTelegramMessage(token, chatId, text);

    if (!res.ok) {
      const raw = await res.text().catch(() => "");
      console.error("[contact] Telegram sendMessage failed:", res.status, raw);
      return NextResponse.json(
        { ok: false, error: describeTelegramFailure(res.status, raw), detail: raw },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
