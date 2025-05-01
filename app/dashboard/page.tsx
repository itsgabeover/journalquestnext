"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { getRandomQuote } from "@/data/motivationalQuotes";
import {
  Compass,
  NotebookPen,
  CalendarCheck,
  CheckCircle,
  Quote,
} from "lucide-react";
import { archetypes } from "@/data/archetypes";

export default function DashboardHome() {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");

  const user = {
    firstName: "Hero",
    archetypeId: "fool",
    totalJournals: 42,
    currentStreak: 5,
    questsCompleted: 12,
  };

  const archetype = archetypes.find((a) => a.id === user.archetypeId);

  useEffect(() => {
    setQuoteOfTheDay(getRandomQuote());
  }, []);

  if (!archetype) {
    return (
      <div className="text-center text-leather-dark p-6">
        Could not load your archetype data.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-parchment-light px-4 box-border py-6 space-y-8">
      {/* Header */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-leather-dark font-quicksand text-center flex items-center gap-2">
        Welcome back, {user.firstName}!
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="hidden sm:inline-block"
        >
          <Compass className="w-6 h-6 text-goldenGlow" />
        </motion.span>
      </h1>

      {/* Archetype + Stats */}
      <Card className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-6 p-4 sm:p-6 bg-parchment-light border-leather-light shadow-md w-full max-w-6xl">
        {/* Left: Framed Image */}
        <div className="relative aspect-[3/4] w-full max-w-[160px] sm:max-w-[192px] mx-auto">
          {/* Inner portrait image */}
          <div className="absolute top-[23%] left-[18%] w-[60%] h-[60%] z-10">
            <Image
              src={archetype.image}
              alt={archetype.name}
              fill
              className="object-cover rounded-sm"
            />
          </div>
          <Image
            src="/medieval-frame.png"
            alt="Medieval Frame"
            fill
            className="object-contain z-20 pointer-events-none"
          />
        </div>

        {/* Center: Archetype Info */}
        <div className="space-y-4 text-center md:text-left flex-1 max-w-xl">
          <div>
            <h2 className="text-2xl font-bold text-leather-dark">
              {archetype.name}
            </h2>
            <p className="text-leather text-sm">{archetype.shortDescription}</p>
          </div>

          {/* Traits */}
          {archetype.traits && (
            <div>
              <h4 className="text-sm font-semibold text-leather-dark mb-1">
                Traits
              </h4>
              <ul className="flex flex-wrap gap-2 justify-center md:justify-start">
                {archetype.traits.map((trait) => (
                  <li
                    key={trait}
                    className="px-2 py-1 text-xs rounded-full bg-parchment-medium border border-leather text-leather-dark"
                  >
                    {trait}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quote */}
          {archetype.quote && (
            <blockquote className="italic text-leather text-sm border-l-2 border-leather-dark pl-4 flex items-start gap-2 max-w-md mx-auto md:mx-0">
              <Quote className="w-4 h-4 mt-1 text-leather-dark" />“
              {archetype.quote}”
            </blockquote>
          )}

          {/* Examples */}
          {archetype.examples && (
            <p className="text-xs text-leather-dark mt-2">
              <span className="font-semibold">Fictional Examples:</span>{" "}
              {archetype.examples}
            </p>
          )}
        </div>

        {/* Right: Stats */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-4 w-full md:w-48 self-center md:self-auto justify-center">
          <Card className="p-4 sm:p-6 text-center bg-parchment-light border-leather-light shadow-sm flex-1">
            <div className="flex justify-center items-center gap-2 text-leather-dark mb-1">
              <NotebookPen className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Total Journals</h3>
            </div>
            <p className="text-2xl font-bold text-leather">
              {user.totalJournals}
            </p>
          </Card>
          <Card className="p-4 sm:p-6 text-center bg-parchment-light border-leather-light shadow-sm flex-1">
            <div className="flex justify-center items-center gap-2 text-leather-dark mb-1">
              <CalendarCheck className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Current Streak</h3>
            </div>
            <p className="text-2xl font-bold text-leather">
              {user.currentStreak} days
            </p>
          </Card>
          <Card className="p-4 sm:p-6 text-center bg-parchment-light border-leather-light shadow-sm flex-1">
            <div className="flex justify-center items-center gap-2 text-leather-dark mb-1">
              <CheckCircle className="w-4 h-4" />
              <h3 className="text-sm font-semibold">Quests Completed</h3>
            </div>
            <p className="text-2xl font-bold text-leather">
              {user.questsCompleted}
            </p>
          </Card>
        </div>
      </Card>

      {/* Quote of the Day */}
      <Card className="p-4 sm:p-6 text-center bg-parchment-light border-leather-light shadow-md w-full max-w-6xl">
        <h3 className="text-xl sm:text-2xl font-bold text-leather-dark flex items-center justify-center gap-2">
          <NotebookPen className="w-5 h-5" />
          Inspiration for Today
        </h3>
        <blockquote className="italic text-leather text-base sm:text-lg max-w-2xl mx-auto">
          "{quoteOfTheDay}"
        </blockquote>
      </Card>
    </div>
  );
}

// "use client";

// import { useEffect } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useAppSelector } from "@/lib/hooks";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { LogOut } from "lucide-react";

// export default function DashboardHome() {
//   const router = useRouter();
//   const user = useAppSelector((state) => state.auth.user);
//   const loading = useAppSelector((state) => state.auth.loading);
//   const pathname = usePathname();

//   //Redirect if not logged in after loading finishes
//   useEffect(() => {
//     if (!loading && !user) {
//       router.push(`/login?next=${pathname}`);
//     }
//   }, [user, loading, router]);

//   if (loading || !user) {
//     return null;
//   }

//   if (loading) {
//   return <div className="p-6">Loading...</div>;
// }

//   return (
//     <div className="space-y-6">
//       {/* Exit Dashboard Button */}
//       <div className="flex justify-end">
//         <Button
//           onClick={() => router.push("/")}
//           variant="outline"
//           className="flex items-center gap-2 text-leather-dark border-leather hover:bg-parchment-dark"
//         >
//           <LogOut className="w-4 h-4" />
//           Exit Dashboard
//         </Button>
//       </div>

//       <h1 className="text-3xl font-bold font-quicksand text-leather-dark">
//         Welcome back, {user?.first_name || "Hero"}! 🧭
//       </h1>

//       <p className="text-leather text-lg max-w-2xl">
//         Your journey continues. Choose where you'd like to go:
//       </p>

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
//         <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
//           <h2 className="text-xl font-semibold text-leather-dark">📚 My Journals</h2>
//           <p className="text-leather text-sm">View, sort, and reflect on your past entries.</p>
//           <Link href="/dashboard/journals">
//             <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
//               Go to Journals
//             </Button>
//           </Link>
//         </Card>

//         <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
//           <h2 className="text-xl font-semibold text-leather-dark">📜 Quest Board</h2>
//           <p className="text-leather text-sm">Track your goals and personal challenges.</p>
//           <Link href="/dashboard/quests">
//             <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
//               Go to QuestBoard
//             </Button>
//           </Link>
//         </Card>

//         <Card className="p-6 space-y-2 shadow-md border-mythicalBlue-200">
//           <h2 className="text-xl font-semibold text-leather-dark">🔮 The Oracle</h2>
//           <p className="text-leather text-sm">Let the Oracle uncover insights from your entries.</p>
//           <Link href="/dashboard/oracle">
//             <Button className="mt-2 bg-leather text-white hover:bg-leather-dark" size="sm">
//               Consult the Oracle
//             </Button>
//           </Link>
//         </Card>
//       </div>
//     </div>
//   );
// }
