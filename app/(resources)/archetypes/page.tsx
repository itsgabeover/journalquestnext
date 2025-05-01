"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { archetypes } from "@/data/archetypes";
import { Archetype } from "@/types";


export default function HomePage() {
  const archetypesRef = useRef(null);
  const isArchetypesInView = useInView(archetypesRef, { once: true });
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const [selectedArchetype, setSelectedArchetype] = useState<Archetype | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <motion.section
        ref={archetypesRef}
        className="py-20 bg-parchment-light"
        initial="hidden"
        animate={isArchetypesInView ? "visible" : "hidden"}
        variants={fadeInUp}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-leather-dark font-quicksand mb-4">
            Discover Your Archetypes
          </h2>
          <p className="text-lg text-leather max-w-2xl mx-auto">
            Archetypes are universal patterns and images that derive from the
            collective unconscious.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archetypes.map((a: Archetype) => (
            <div
              key={a.id}
              className="p-6 rounded-lg bg-white border border-mythicalBlue-300 shadow-md hover:shadow-lg transition-all text-center cursor-pointer"
              onClick={() => {
                setSelectedArchetype(a);
                setIsOpen(true);
              }}
            >
              <div className="h-48 w-full relative rounded-md overflow-hidden mb-4">
                <Image
                  src={a.image}
                  alt={a.name}
                  fill
                  className="object-cover object-top transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-bold font-quicksand text-leather-dark mb-2">
                {a.name}
              </h3>
              <p className="text-leather text-sm">{a.shortDescription}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-leather hover:bg-leather-dark text-white"
          >
            <Link href="https://archetypes.jilecek.cz/" target="_blank">
              Take the Archetype Quiz
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto p-6">
          {selectedArchetype && (
            <div className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-leather-dark font-quicksand text-2xl">
                  {selectedArchetype.name}
                </DialogTitle>
                <DialogDescription className="text-leather">
                  {selectedArchetype.fullDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Archetype Image */}
              <div className="relative w-full h-80 rounded-md overflow-hidden bg-white">
                <Image
                  src={selectedArchetype.image}
                  alt={`Portrait of the ${selectedArchetype.name} archetype`}
                  fill
                  loading="lazy"
                  className="object-contain object-center"
                />
              </div>

              {/* Traits */}
              <div>
                <h3 className="text-lg font-semibold text-leather-dark mb-2">
                  Traits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedArchetype.traits.map((trait) => (
                    <span
                      key={trait}
                      className="bg-mythicalBlue-100 text-mythicalBlue-800 px-2 py-1 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <div>
                <h3 className="text-lg font-semibold text-leather-dark mb-1">
                  Quote
                </h3>
                <blockquote className="text-leather italic border-l-4 border-leather-dark pl-4">
                  “{selectedArchetype.quote}”
                </blockquote>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-lg font-semibold text-leather-dark mb-1">
                  Famous Examples
                </h3>
                <p className="text-leather text-sm">
                  {selectedArchetype.examples}
                </p>
              </div>

              {/* Close Button */}
              <Button
                onClick={() => setIsOpen(false)}
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