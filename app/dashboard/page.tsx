"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getRandomQuote } from "@/data/motivationalQuotes";
import {
  NotebookPen,
  CalendarCheck,
  CheckCircle,
  Quote,
  RefreshCw,
  BookOpen,
  PenTool,
} from "lucide-react";
import { archetypes } from "@/data/archetypes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DashboardHome() {
  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");
  const [isQuoteRefreshing, setIsQuoteRefreshing] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLParagraphElement>(null);

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

  // Effect to measure and set the image container height
useEffect(() => {
  const updateHeight = () => {
    if (imageContainerRef.current) {
      setImageHeight(imageContainerRef.current.offsetHeight);
    }
  };

  updateHeight();

  const resizeObserver = new ResizeObserver(updateHeight);
  const currentRef = imageContainerRef.current;
  if (currentRef) {
    resizeObserver.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      resizeObserver.unobserve(currentRef);
    }
  };
}, []);


  // Effect to check if left column content is overflowing
useEffect(() => {
  const checkTextTruncation = () => {
    if (textContainerRef.current && textContentRef.current) {
      const containerHeight = textContainerRef.current.clientHeight;
      const contentHeight = textContentRef.current.scrollHeight;
      setIsTextTruncated(contentHeight > containerHeight);
    } else {
      setIsTextTruncated(false);
    }
  };

  checkTextTruncation();

  const resizeObserver = new ResizeObserver(checkTextTruncation);
  const currentRef = textContainerRef.current;
  if (currentRef) {
    resizeObserver.observe(currentRef);
  }

  return () => {
    if (currentRef) {
      resizeObserver.unobserve(currentRef);
    }
  };
}, [imageHeight]);


  const refreshQuote = () => {
    setIsQuoteRefreshing(true);
    setTimeout(() => {
      setQuoteOfTheDay(getRandomQuote());
      setIsQuoteRefreshing(false);
    }, 600);
  };

  if (!archetype) {
    return (
      <div className="text-center text-leather-dark p-6">
        Could not load your archetype data.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center bg-parchment-light px-4 box-border py-6 space-y-8">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-leather-dark font-quicksand text-center flex items-center justify-center gap-0">
            <span className="relative">
              Welcome back, {user.firstName}!
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-goldenGlow rounded-full"
                initial={{ width: 0, x: "50%" }}
                animate={{ width: "100%", x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </span>
            <div className="w-20 h-20 relative">
              <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 -mt-2 sm:-mt-4">
                <DotLottieReact
                  src="/lotties/campfireanimation.lottie"
                  autoplay
                  loop
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </h1>

          <div className="flex gap-2 mt-4 sm:mt-0">
            <Button
              asChild
              className="bg-leather text-white hover:bg-leather-dark"
            >
              <Link href="/dashboard/journals?view=write">
                <PenTool className="w-4 h-4 mr-2" />
                Write New Entry
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Archetype Hero Section with Three-Column Layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-6xl"
      >
        <Card className="p-6 sm:p-8 bg-parchment-light border-leather-light shadow-md overflow-hidden relative">
          {/* Archetype Title - Above the columns */}

          {/* Three-Column Layout (responsive) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Left Column: Archetype Image */}
            <div
              ref={imageContainerRef}
              className="order-1 lg:order-1 flex justify-center"
            >
              {/* Enhanced Centered Framed Image */}
              <div className="relative aspect-[3/4] w-full max-w-[220px] sm:max-w-[260px] mx-auto group">
                {/* Inner portrait image with reduced padding */}
                <div className="absolute top-[18%] left-[15%] w-[75%] h-[75%] z-10 overflow-hidden rounded-sm transition-all duration-300">
                  <Image
                    src={archetype.image || "/placeholder.svg"}
                    alt={archetype.name}
                    fill
                    priority
                    className="object-cover transition-all duration-500 group-hover:brightness-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-leather-dark/0 transition-all duration-300 group-hover:bg-leather-dark/10" />
                </div>

                <Image
                  src="/medieval-frame.png"
                  alt="Medieval Frame"
                  fill
                  className="object-contain z-20 pointer-events-none"
                />
              </div>
            </div>

            {/* Middle Column: Archetype Info - Height constrained to match image */}
            <div
              className="order-2 lg:order-2 text-center lg:text-left relative"
              style={{
                height:
                  typeof window !== "undefined" &&
                  window.innerWidth >= 1024 &&
                  imageHeight > 0
                    ? `${imageHeight}px`
                    : "auto",
              }}
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-leather-dark flex items-center gap-2 justify-center">
                  {archetype.name}
                  <span className="text-xs px-2 py-1 bg-leather text-white rounded-full">
                    Primary Archetype
                  </span>
                </h2>
              </div>
              {/* Text container with truncation */}
              <div
                ref={textContainerRef}
                className="h-full overflow-hidden relative"
                style={{
                  maxHeight:
                    typeof window !== "undefined" && window.innerWidth >= 1024
                      ? `${imageHeight - (isTextTruncated ? 80 : 0) - 70}px`
                      : "none",
                }}
              >
                <div ref={textContentRef} className="space-y-4">
                  {/* Full description */}
                  <div>
                    <h4 className="text-sm font-semibold text-leather-dark mb-2">
                      About {archetype.name}
                    </h4>
                    <p className="text-leather text-sm">
                      {archetype.fullDescription || archetype.shortDescription}
                    </p>
                  </div>

                  {/* Traits - visible if there's space */}
                  {!isTextTruncated && archetype.traits && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-leather-dark mb-2">
                        Traits
                      </h4>
                      <ul className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {archetype.traits.map((trait) => (
                          <motion.li
                            key={trait}
                            whileHover={{ scale: 1.05 }}
                            className="px-3 py-1 text-xs rounded-full bg-parchment-medium border border-leather text-leather-dark hover:bg-leather-light/10 transition-colors"
                          >
                            {trait}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Gradient fade at bottom when text is truncated */}
                {isTextTruncated && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none z-10"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(248, 246, 242, 1), rgba(248, 246, 242, 0))",
                    }}
                  />
                )}
              </div>

              {/* See More button - visible when text is truncated, regardless of screen size */}
              {isTextTruncated && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(true)}
                  className="mt-2 text-leather hover:text-leather-dark flex items-center gap-1 z-50 mx-auto relative"
                >
                  See More
                </Button>
              )}
            </div>

            {/* Right Column: Stats - Height constrained to match image */}
            <div
              className="order-3 lg:order-3 flex flex-col justify-between gap-1"
              style={{
                height:
                  imageHeight > 0 && window.innerWidth >= 1024
                    ? `${imageHeight}px`
                    : "auto",
                maxHeight:
                  imageHeight > 0 && window.innerWidth >= 1024
                    ? `${imageHeight}px`
                    : "auto",
              }}
            >
              {/* Stats Cards - Evenly distributed in the available height */}
              <motion.div whileHover={{ scale: 1.03 }} className="hover-lift">
                <Card className="p-1 gap-1 text-center bg-parchment-light border-leather-light shadow-sm card-glow">
                  <div className="flex justify-center items-center gap-2 text-leather-dark">
                    <NotebookPen className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Total Journals</h3>
                  </div>
                  <p className="text-xl font-bold text-leather">
                    {user.totalJournals}
                  </p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} className="hover-lift">
                <Card className="p-1 gap-1 text-center bg-parchment-light border-leather-light shadow-sm card-glow">
                  <div className="flex justify-center items-center gap-2 text-leather-dark">
                    <CalendarCheck className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Current Streak</h3>
                  </div>
                  <p className="text-xl font-bold text-leather">
                    {user.currentStreak} days
                  </p>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.03 }} className="hover-lift">
                <Card className="p-1 gap-1 text-center bg-parchment-light border-leather-light shadow-sm card-glow">
                  <div className="flex justify-center items-center gap-2 text-leather-dark">
                    <CheckCircle className="w-4 h-4" />
                    <h3 className="text-sm font-semibold">Quests Completed</h3>
                  </div>
                  <p className="text-xl font-bold text-leather">
                    {user.questsCompleted}
                  </p>
                </Card>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Enhanced Quote of the Day */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="w-full max-w-6xl"
      >
        <Card className="p-6 sm:p-8 text-center bg-parchment-light border-leather-light shadow-md relative overflow-hidden animated-border">
          <div className="absolute top-0 right-0 p-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshQuote}
              disabled={isQuoteRefreshing}
              className="text-leather hover:text-leather-dark hover:bg-leather-light/10"
            >
              <RefreshCw
                className={`w-4 h-4 ${isQuoteRefreshing ? "animate-spin" : ""}`}
              />
              <span className="sr-only">New Quote</span>
            </Button>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-leather-dark flex items-center justify-center gap-2 mb-4">
            <Quote className="w-5 h-5" />
            Inspiration for Today
          </h3>

          <div className="relative max-w-3xl mx-auto px-8">
            <Quote className="absolute top-0 left-0 w-6 h-6 text-leather-light/40" />
            <motion.blockquote
              key={quoteOfTheDay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="italic text-leather text-base sm:text-lg"
            >
              {quoteOfTheDay}
            </motion.blockquote>
            <Quote className="absolute bottom-0 right-0 w-6 h-6 text-leather-light/40 transform rotate-180" />
          </div>
        </Card>
      </motion.div>

      {/* Quick Actions Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="w-full max-w-6xl"
      >
        <Card className="p-6 sm:p-8 bg-parchment-light border-leather-light shadow-md">
          <h3 className="text-xl font-bold text-leather-dark mb-4 text-center">
            Continue Your Journey
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-auto py-4 border-leather text-leather hover:bg-parchment hover:text-leather-dark flex flex-col items-center"
            >
              <Link href="/dashboard/journals?view=write">
                <PenTool className="w-6 h-6 mb-2" />
                <span className="text-base">Write New Entry</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto py-4 border-leather text-leather hover:bg-parchment hover:text-leather-dark flex flex-col items-center"
            >
              <Link href="/dashboard/journals">
                <BookOpen className="w-6 h-6 mb-2" />
                <span className="text-base">Browse Journals</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-auto py-4 border-leather text-leather hover:bg-parchment hover:text-leather-dark flex flex-col items-center"
            >
              <Link href="/dashboard/quests">
                <CheckCircle className="w-6 h-6 mb-2" />
                <span className="text-base">View Quests</span>
              </Link>
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Archetype Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
          {archetype && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-leather-dark font-quicksand text-2xl">
                  {archetype.name}
                </DialogTitle>
                <DialogDescription className="text-leather">
                  {archetype.fullDescription || archetype.shortDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Archetype Image */}
              <div className="relative w-full h-80 rounded-md overflow-hidden bg-white">
                <Image
                  src={archetype.image || "/placeholder.svg"}
                  alt={`Portrait of the ${archetype.name} archetype`}
                  fill
                  loading="lazy"
                  className="object-contain object-center"
                />
              </div>

              {/* Traits */}
              {archetype.traits && (
                <div>
                  <h3 className="text-lg font-semibold text-leather-dark mb-2">
                    Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {archetype.traits.map((trait) => (
                      <span
                        key={trait}
                        className="bg-mythicalBlue-100 text-mythicalBlue-800 px-2 py-1 rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Quote */}
              {archetype.quote && (
                <div>
                  <h3 className="text-lg font-semibold text-leather-dark mb-1">
                    Quote
                  </h3>
                  <blockquote className="text-leather italic border-l-4 border-leather-dark pl-4">
                    &ldquo;{archetype.quote}&rdquo;
                  </blockquote>
                </div>
              )}

              {/* Examples */}
              {archetype.examples && (
                <div>
                  <h3 className="text-lg font-semibold text-leather-dark mb-1">
                    Famous Examples
                  </h3>
                  <p className="text-leather text-sm">{archetype.examples}</p>
                </div>
              )}

              {/* Close Button */}
              <Button
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-leather text-white hover:bg-leather-dark"
              >
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
