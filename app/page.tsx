import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, Brain, Feather } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-mythicalBlue-800 to-mythicalBlue-700 opacity-90 z-0" />
        <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover opacity-20 z-0" />

        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white font-quicksand">
                Welcome, Hero. Your journey begins here.
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
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
          </div>
        </div>
      </section>

      {/* What is This App? Section */}
      <section className="py-16 md:py-24 bg-parchment-light">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-leather-dark">
              Your thoughts are a story—let&apos;s uncover your inner hero, sage, or magician.
            </h2>
            <p className="text-leather max-w-2xl mx-auto">
              Our journaling app uses Carl Jung&apos;s archetypal framework to help you understand yourself on a deeper
              level.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="p-6 rounded-lg bg-parchment-light bg-gradient-to-br from-parchment-light to-[#F7F0E3] border border-mythicalBlue-300 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:border-leather text-center">
              <div className="h-14 w-14 rounded-full bg-mythicalBlue-300 flex items-center justify-center mb-4 mx-auto">
                <Feather className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand text-leather-dark">Guided Journaling</h3>
              <p className="text-leather font-sans">
                Thoughtful prompts based on your unique archetype to inspire meaningful reflection.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-parchment-light bg-gradient-to-br from-mythicalBlue-100 to-mythicalBlue-200 border border-mythicalBlue-400 shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:border-leather text-center">
              <div className="h-14 w-14 rounded-full bg-mythicalBlue-400 flex items-center justify-center mb-4 mx-auto">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand text-leather-dark">Deeper Self-Understanding</h3>
              <p className="text-leather font-sans">
                Track your personal growth and gain insights into your patterns and behaviors.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-parchment-light bg-gradient-to-br from-leather-light to-[#E8D8C0] border border-leather shadow-md transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg hover:border-leather-dark text-center">
              <div className="h-14 w-14 rounded-full bg-leather flex items-center justify-center mb-4 mx-auto">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand text-leather-dark">A Narrative Approach</h3>
              <p className="text-leather font-sans">
                Make sense of your life&apos;s journey by viewing it through the lens of timeless archetypes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz CTA Section */}
      <section className="py-16 md:py-24 bg-mythicalBlue-50">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-mythicalBlue-100 to-mythicalBlue-200 p-8 md:p-12 rounded-xl border border-mythicalBlue-300 backdrop-blur-md">
            <div className="flex flex-col items-center text-center mb-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand">Ready to Begin?</h2>
              <p className="text-lg text-leather font-sans max-w-2xl">
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
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="flex flex-col items-center space-y-3">
                <div className="bg-mythicalBlue-300 rounded-lg p-4 w-full border border-mythicalBlue-400 aspect-[3/4] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/archetypes/Warrior.jpg"
                      alt="Warrior Archetype"
                      fill
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <p className="font-semibold font-quicksand text-leather-dark text-lg">The Warrior</p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-mythicalBlue-300 rounded-lg p-4 w-full border border-mythicalBlue-400 aspect-[3/4] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/archetypes/Sage.jpg"
                      alt="Sage Archetype"
                      fill
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <p className="font-semibold font-quicksand text-leather-dark text-lg">The Sage</p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-mythicalBlue-300 rounded-lg p-4 w-full border border-mythicalBlue-400 aspect-[3/4] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/archetypes/Seeker.jpg"
                      alt="Seeker Archetype"
                      fill
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <p className="font-semibold font-quicksand text-leather-dark text-lg">The Seeker</p>
              </div>

              <div className="flex flex-col items-center space-y-3">
                <div className="bg-mythicalBlue-300 rounded-lg p-4 w-full border border-mythicalBlue-400 aspect-[3/4] flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src="/archetypes/Creator.jpg"
                      alt="Creator Archetype"
                      fill
                      className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                </div>
                <p className="font-semibold font-quicksand text-leather-dark text-lg">The Creator</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Informational Video Section */}
      <section className="py-16 md:py-24 bg-parchment-light">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-leather-dark font-quicksand">
              The Power of Archetypes
            </h2>
            <p className="text-leather font-sans">
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
        </div>
      </section>

      {/* Signup CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-mythicalBlue-50 to-mythicalBlue-100">
        <div className="container">
          <div className="flex flex-col items-center max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-leather-dark font-quicksand">
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-mythicalBlue-200 bg-parchment-light">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-leather mb-4 md:mb-0 font-sans">
              © {new Date().getFullYear()} Journal Quest. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-sm text-leather hover:text-mythicalBlue-500 font-sans">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-leather hover:text-mythicalBlue-500 font-sans">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-leather hover:text-mythicalBlue-500 font-sans">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

