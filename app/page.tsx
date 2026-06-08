import Experience from "@/components/Experience";
import Hud from "@/components/Hud";
import Hero from "@/components/Hero";
import StatSheet from "@/components/StatSheet";
import QuestLog from "@/components/QuestLog";
import Dungeons from "@/components/Dungeons";
import Lore from "@/components/Lore";
import SavePoint from "@/components/SavePoint";

export default function Home() {
  return (
    <Experience>
      <Hud />
      <main className="relative z-10">
        <Hero />
        <StatSheet />
        <QuestLog />
        <Dungeons />
        <Lore />
        <SavePoint />
      </main>
    </Experience>
  );
}
