"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { archetypes } from "@/data/archetypes";

export default function HomePage() {
  const heroRef = useRef(null);
  const archetypesRef = useRef(null);
  const quizRef = useRef(null);
  const videoRef = useRef(null);
  const signupRef = useRef(null);
  const footerRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isArchetypesInView = useInView(archetypesRef, { once: true });
  const isQuizInView = useInView(quizRef, { once: true });
  const isVideoInView = useInView(videoRef, { once: true });
  const isSignupInView = useInView(signupRef, { once: true });
  const isFooterInView = useInView(footerRef, { once: true });

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const featuredArchetypes = archetypes.filter((a) =>
    ["Seeker", "Warrior", "Sage (Senex)"].includes(a.name)
  );
 

  return (
    <div className="w-full max-w-7xl mx-auto">
{/* Hero */}
<section
  ref={heroRef}
  className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
>
  {/* Background gradient */}
  <div className="absolute inset-0 bg-gradient-to-b from-mythicalBlue-800 to-mythicalBlue-700 opacity-90 z-0" />

  {/* Background image */}
  <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-20 z-0" />

  {/* Only this text block fades in */}
  <motion.div
    className="relative z-10 text-center space-y-6 max-w-3xl"
    initial="hidden"
    animate={isHeroInView ? "visible" : "hidden"}
    variants={fadeInUp}
  >
    <h1 className="text-4xl md:text-6xl font-quicksand font-bold text-white leading-tight">
      Welcome, Hero.
      <br />
      Your Journey Begins Here.
    </h1>
    <p className="text-xl md:text-2xl text-white/90">
      Unlock the hidden patterns of your mind. Journal with an archetypal framework to uncover your true self.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
      <Button asChild size="lg" className="bg-leather hover:bg-leather-dark text-white">
        <Link href="https://archetypes.jilecek.cz/" target="_blank">
          Take the Archetype Quiz
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      <Button
        asChild
        size="lg"
        className="bg-leather text-white hover:bg-leather-dark font-quicksand font-semibold"
      >
        <Link href="/signup">
          Sign Up & Start Journaling
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  </motion.div>

  {/* Chevron stays animated separately */}
  <motion.div
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
  >
    <ChevronRight className="h-10 w-10 text-white rotate-90" />
  </motion.div>
</section>


      {/* Archetypes Section */}
      <motion.section
        ref={archetypesRef}
        className="py-20 bg-parchment-light px-4"
        initial="hidden"
        animate={isArchetypesInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand mb-4">
            Discover Your Archetypes
          </h2>
          <p className="text-lg text-leather max-w-2xl mx-auto">
            Archetypes are universal patterns and images that derive from the collective unconscious. Discover which
            ones resonate with you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArchetypes.map((a) => (
            <div
              key={a.name}
              className="p-6 rounded-lg bg-white border border-mythicalBlue-300 shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="h-48 w-full relative rounded-md overflow-hidden mb-4">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  className="object-cover object-top transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-bold font-quicksand text-leather-dark mb-2">{a.name}</h3>
              <p className="text-leather text-sm">{a.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" className="border-leather text-leather hover:bg-leather/10">
            <Link href="/archetypes">
              Explore All Archetypes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Quiz CTA */}
      <motion.section
        ref={quizRef}
        className="py-24 bg-mythicalBlue-50"
        initial="hidden"
        animate={isQuizInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-lg text-leather">
            Take this free and insightful quiz to reveal your dominant archetype and begin your transformation.
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
        </div>
      </motion.section>

      {/* Video Section */}
      <motion.section
        ref={videoRef}
        className="py-24 bg-parchment-light"
        initial="hidden"
        animate={isVideoInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand">
            The Power of Archetypes
          </h2>
          <p className="text-leather">
            Learn about Carl Jung&apos;s archetypal framework and how it can transform your journaling experience.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto rounded-xl overflow-hidden border border-mythicalBlue-300 shadow-xl">
          <iframe
            src="https://www.youtube.com/embed/YFMQlm6mHUQ"
            title="The Power of Archetypes"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-[500px] rounded-xl border border-gray-300"
          ></iframe>
        </div>
      </motion.section>

      {/* Signup CTA */}
      <motion.section
        ref={signupRef}
        className="py-24 bg-gradient-to-b from-mythicalBlue-50 to-mythicalBlue-100"
        initial="hidden"
        animate={isSignupInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand">
            Your story is waiting to be written.
          </h2>
          <p className="text-xl text-leather">
            Join thousands who have discovered their archetypal patterns and transformed their lives through journaling.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-leather text-white hover:bg-leather-dark font-quicksand font-semibold"
          >
            <Link href="/signup">
              Sign Up & Start Journaling
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        ref={footerRef}
        className="bg-leather-dark text-white py-12"
        initial={{ opacity: 0 }}
        animate={isFooterInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} className="mx-auto" />
          <p className="text-white/80">
            Unlock the hidden patterns of your mind with archetypal journaling. Start your journey of self-discovery today.
          </p>
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Journal Quest. All rights reserved.
          </div>
          <div className="text-xs text-white/60 flex justify-center items-center gap-1">
            <Heart className="h-3 w-3" /> Made with love for your archetypal journey
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
