import { Achievement } from "@/components/achievement";
import { BossTimer } from "@/components/boss-timer";
import { Cover } from "@/components/cover";
import { DungeonMap } from "@/components/dungeon-map";
import { Gate, Locked } from "@/components/gate";
import { Inventory } from "@/components/inventory";
import { Jukebox } from "@/components/jukebox";
import { CrtOverlay, PartyMargins } from "@/components/pixel";
import { QuestLog } from "@/components/quest-log";
import { QuestRoadmap } from "@/components/quest-roadmap";

export default function Page() {
  return (
    <>
      <CrtOverlay />
      <PartyMargins />
      <main className="relative z-10 mx-auto min-h-dvh w-full max-w-[430px]">
        <Gate>
          <Cover />
          <Locked>
            <QuestLog />
            <Achievement />
            <Inventory />
            <Jukebox />
            <DungeonMap />
            <BossTimer />
            <QuestRoadmap />
          </Locked>
        </Gate>
      </main>
    </>
  );
}
