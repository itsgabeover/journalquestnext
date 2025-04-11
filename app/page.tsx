// app/page.tsx

"use client";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, Brain, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const heroRef = useRef(null);
  const whatRef = useRef(null);
  const quizRef = useRef(null);
  const infoRef = useRef(null);
  const signupRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isWhatInView = useInView(whatRef, { once: true });
  const isQuizInView = useInView(quizRef, { once: true });
  const isInfoInView = useInView(infoRef, { once: true });
  const isSignupInView = useInView(signupRef, { once: true });

  const fadeInStagger = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6 },
    }),
  };

  return (
    <>
      <Head>
        <title>Welcome to Journal Quest</title>
        <meta
          name="description"
          content="Start your archetypal journaling adventure."
        />
      </Head>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-mythicalBlue-800 to-mythicalBlue-700 opacity-90 z-0" />
          <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover opacity-20 z-0" />

          <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
            <motion.div
              ref={heroRef}
              initial={{ opacity: 0, y: 50 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center text-center space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-white font-quicksand">
                  Welcome, Hero. Your journey begins here.
                </h1>
                <p className="text-xl lg:text-2xl text-white/90">
                  Unlock the hidden patterns of your mind. Journal with an archetypal framework to uncover your true self.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="bg-leather hover:bg-leather-dark text-white">
                  <Link href="https://archetypes.jilecek.cz/" target="_blank">
                    Take the Archetype Quiz
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-parchment-light text-white hover:bg-white/20"
                >
                  <Link href="/signup">Sign Up & Start Journaling</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Archetype Cards Section */}
        <section className="py-20 bg-parchment-light">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { name: "The Warrior", image: "/archetypes/Warrior.jpg" },
                { name: "The Sage", image: "/archetypes/Sage.jpg" },
                { name: "The Creator", image: "/archetypes/Creator.jpg" },
              ].map((archetype, index) => (
                <motion.div
                  key={archetype.name}
                  className="p-6 rounded-lg bg-white border border-mythicalBlue-300 shadow-md hover:shadow-lg transition-all text-center"
                  initial="hidden"
                  animate="visible"
                  variants={fadeInStagger}
                  custom={index}
                >
                  <div className="h-48 w-full relative rounded-md overflow-hidden mb-4">
                    <Image
                      src={archetype.image}
                      alt={archetype.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <h3 className="text-xl font-bold font-quicksand text-leather-dark">
                    {archetype.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quiz CTA Section */}
        <motion.section
          ref={quizRef}
          initial="hidden"
          animate={isQuizInView ? "visible" : "hidden"}
          variants={fadeInStagger}
          className="py-24 bg-mythicalBlue-50"
        >
          <div className="container mx-auto px-4">
            <motion.div custom={0} variants={fadeInStagger} className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-leather-dark font-quicksand">
                Ready to Begin?
              </h2>
              <p className="text-lg text-leather font-sans max-w-2xl mx-auto">
                Take this free and insightful quiz to reveal your dominant archetype.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-leather text-white hover:bg-leather-dark font-quicksand font-semibold"
              >
                <Link href="https://archetypes.jilecek.cz/" target="_blank" rel="noreferrer">
                  Start the Quiz
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Informational Video Section */}
        <motion.section
          ref={infoRef}
          initial="hidden"
          animate={isInfoInView ? "visible" : "hidden"}
          variants={fadeInStagger}
          className="py-24 bg-parchment-light"
        >
          <div className="container mx-auto px-4">
            <motion.div custom={0} variants={fadeInStagger} className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-leather-dark font-quicksand">
                The Power of Archetypes
              </h2>
              <p className="text-leather font-sans">
                Learn about Carl Jung&apos;s archetypal framework and how it can transform your journaling experience.
              </p>
            </motion.div>
            <motion.div custom={1} variants={fadeInStagger} className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border border-mythicalBlue-300 shadow-xl">
              <iframe
                src="https://www.youtube.com/embed/YFMQlm6mHUQ"
                title="The Power of Archetypes"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[500px] rounded-xl border border-gray-300"
              ></iframe>
            </motion.div>
          </div>
        </motion.section>

        {/* Signup CTA Section */}
        <motion.section
          ref={signupRef}
          initial="hidden"
          animate={isSignupInView ? "visible" : "hidden"}
          variants={fadeInStagger}
          className="py-24 bg-gradient-to-b from-mythicalBlue-50 to-mythicalBlue-100"
        >
          <div className="container mx-auto px-4">
            <motion.div custom={0} variants={fadeInStagger} className="flex flex-col items-center max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl lg:text-5xl font-bold text-leather-dark font-quicksand">
                Your story is waiting to be written. Begin today.
              </h2>
              <p className="text-xl text-leather max-w-2xl mx-auto font-sans">
                Join thousands of others who have discovered their archetypal patterns and transformed their lives through
                guided journaling.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-leather text-white hover:bg-leather-dark mt-4 font-quicksand font-semibold"
              >
                <Link href="/signup">
                  Sign Up & Start Journaling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </>
  );
}
