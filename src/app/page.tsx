import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Services from "@/components/Services";
import Metrics from "@/components/Metrics";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Projects from "@/components/Projects";
import AgentsBlock from "@/components/AgentsBlock";
import Contact from "@/components/Contact";
import FloatingContactButton from "@/components/FloatingContactButton";
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Metrics />
        <Experience />
        <Stack />
        <Projects />
        <AgentsBlock />
      </main>
      <Contact />
      <FloatingContactButton />
      <SpeedInsights />

    </>
  );
}
