// Telegram Bot API helpers for the contact form.
// Kept dependency-free (no next/server, no data imports) so it can be
// unit-tested in isolation with plain node.

export type TelegramSendPayload = {
  chat_id: string;
  text: string;
  parse_mode: "HTML";
  disable_web_page_preview: boolean;
};

export const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function sendTelegramMessage(
  token: string,
  chatId: string,
  text: string,
): Promise<Response> {
  const payload: TelegramSendPayload = {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  return fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// Translate Telegram's error codes into an actionable message for the site owner.
export function describeTelegramFailure(status: number, raw: string): string {
  const description = safeParse(raw)?.description ?? "";
  if (status === 401 || /unauthorized/i.test(description)) {
    return "Bot token is invalid. Re-copy it from @BotFather into TELEGRAM_BOT_TOKEN.";
  }
  if (/chat not found/i.test(description)) {
    return "Chat ID is wrong — or you never sent your bot a message first. Message the bot once, then re-run getUpdates.";
  }
  if (/blocked/i.test(description)) {
    return "The bot was blocked. Unblock it in Telegram and send it a message.";
  }
  if (status === 429) {
    return "Telegram rate limit hit. Try again in a moment.";
  }
  return "Could not deliver your message. Please try again.";
}

function safeParse(raw: string): { description?: string } | null {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
