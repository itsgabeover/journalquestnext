// This file contains the archetypes data for the application.
import { type Archetype } from "@/types";

export const archetypes: Archetype[] = [
  {
    id: "seeker",
    name: "Seeker",
    image: "/archetypes/Seeker.jpg",
    shortDescription:
      "The Seeker is driven by a quest for deeper meaning and truth.",
    fullDescription:
      "The Seeker archetype embodies the human desire for independence and the journey to find one's authentic self. Seekers are driven by a deep yearning for fulfillment and meaning beyond the ordinary world. They often feel constrained by conventional society and seek freedom through exploration, adventure, and discovery. The Seeker's journey is both external (traveling to new places) and internal (exploring new ideas and perspectives). At their best, Seekers are authentic, ambitious, and independent. Their shadow aspects can manifest as restlessness, inability to commit, and perpetual dissatisfaction.",
    traits: [
      "Independent",
      "Adventurous",
      "Authentic",
      "Restless",
      "Ambitious",
    ],
    quote: "Not all who wander are lost.",
    examples: "Odysseus, Amelia Earhart, Indiana Jones",
  },
  {
    id: "innocent",
    name: "Innocent",
    image: "/archetypes/Innocent.jpg",
    shortDescription:
      "The Innocent embodies optimism, goodness, and a pure heart.",
    fullDescription:
      "The Innocent archetype represents purity, goodness, and the childlike belief in the possibility of paradise. Innocents approach life with optimism and trust, seeing the good in others and situations. They value simplicity, morality, and nostalgia for simpler times. At their best, Innocents bring joy, faith, and openness to the world. Their shadow aspects can include naivety, denial of problems, and an unwillingness to grow up and face difficult truths. The Innocent's journey often involves maintaining faith while integrating the complexities and disappointments of life.",
    traits: ["Optimistic", "Pure", "Trusting", "Faithful", "Naive"],
    quote: "There's no place like home.",
    examples: "Dorothy from The Wizard of Oz, Forrest Gump, Snow White",
  },
  {
    id: "orphan",
    name: "Orphan",
    image: "/archetypes/Orphan.jpg",
    shortDescription:
      "The Orphan seeks belonging and connection after experiencing abandonment.",
    fullDescription:
      "The Orphan archetype emerges from the universal fear of abandonment and the struggle to find belonging in a difficult world. Orphans have often experienced disappointment, betrayal, or neglect, leading them to be realistic and pragmatic. They value empathy, resilience, and community, seeking connection with others who understand their pain. At their best, Orphans are empathetic, resilient, and interdependent. Their shadow aspects can include victimhood, cynicism, and emotional dependency. The Orphan's journey involves moving from feeling victimized to developing resilience and finding belonging.",
    traits: [
      "Realistic",
      "Empathetic",
      "Resilient",
      "Interdependent",
      "Pragmatic",
    ],
    quote: "We're all in this together.",
    examples: "Oliver Twist, Harry Potter, Jane Eyre",
  },
  {
    id: "fool",
    name: "Fool (Jester)",
    image: "/archetypes/Fool.jpg",
    shortDescription:
      "The Fool brings joy, humor, and a fresh perspective to life.",
    fullDescription:
      "The Fool or Jester archetype embodies joy, humor, and the spirit of play. Fools live in the moment, finding delight in simple pleasures and bringing levity to serious situations. They value spontaneity, authenticity, and the freedom to break social conventions. At their best, Fools bring joy, creativity, and fresh perspectives to the world. Their shadow aspects can include irresponsibility, cruelty in their humor, and using comedy to avoid deeper issues. The Fool's journey involves balancing playfulness with wisdom, using humor to reveal truth rather than escape it.",
    traits: ["Playful", "Spontaneous", "Humorous", "Irreverent", "Present"],
    quote: "Life is too important to be taken seriously.",
    examples:
      "Charlie Chaplin, Robin Williams, Puck from A Midsummer Night's Dream",
  },
  {
    id: "sage",
    name: "Sage (Senex)",
    image: "/archetypes/Sage.jpg",
    shortDescription:
      "The Sage seeks wisdom and truth through knowledge and reflection.",
    fullDescription:
      "The Sage archetype represents the human quest for truth and understanding through knowledge, analysis, and reflection. Sages are driven by a desire to find wisdom and share it with others. They value objectivity, critical thinking, and the pursuit of higher truths. At their best, Sages are wise, insightful, and thoughtful. Their shadow aspects can include dogmatism, overthinking, and disconnection from emotions and practical realities. The Sage's journey involves integrating intellectual knowledge with emotional wisdom and applying their insights to real-world situations.",
    traits: ["Wise", "Knowledgeable", "Thoughtful", "Objective", "Reflective"],
    quote: "The unexamined life is not worth living.",
    examples: "Socrates, Gandalf, Yoda",
  },
  {
    id: "king",
    name: "King",
    image: "/archetypes/King.jpg",
    shortDescription:
      "The King embodies leadership, order, and the responsible use of power.",
    fullDescription:
      "The King archetype represents the energy of wise leadership, order, and the responsible use of power. Kings create harmony in their kingdoms through fair governance and clear boundaries. They value responsibility, integrity, and the greater good of their community. At their best, Kings are benevolent, just, and generative. Their shadow aspects can include tyranny, rigidity, and abuse of power. The King's journey involves balancing authority with compassion, using power to serve rather than dominate, and creating systems that benefit all.",
    traits: [
      "Authoritative",
      "Responsible",
      "Orderly",
      "Generous",
      "Protective",
    ],
    quote: "With great power comes great responsibility.",
    examples:
      "King Solomon, Aragorn from Lord of the Rings, T'Challa (Black Panther)",
  },
  {
    id: "creator",
    name: "Creator",
    image: "/archetypes/Creator.jpg",
    shortDescription:
      "The Creator brings new ideas and visions into reality through innovation.",
    fullDescription:
      "The Creator archetype embodies the urge to create something new and express one's vision in tangible form. Creators are driven by imagination and the desire to give form to their ideas, whether through art, innovation, or entrepreneurship. They value originality, authenticity, and the process of creation itself. At their best, Creators are innovative, expressive, and visionary. Their shadow aspects can include perfectionism, creative blocks, and valuing creation over human connection. The Creator's journey involves finding the courage to express their unique vision while remaining open to feedback and collaboration.",
    traits: [
      "Imaginative",
      "Innovative",
      "Expressive",
      "Authentic",
      "Visionary",
    ],
    quote: "To create is to live twice.",
    examples: "Leonardo da Vinci, Frida Kahlo, Steve Jobs",
  },
  {
    id: "rebel",
    name: "Rebel (Destroyer)",
    image: "/archetypes/Rebel.jpg",
    shortDescription:
      "The Rebel challenges the status quo and breaks down outdated structures.",
    fullDescription:
      "The Rebel or Destroyer archetype represents the energy that challenges the status quo and breaks down what is no longer serving its purpose. Rebels are driven by a desire for revolution, freedom from constraints, and authentic self-expression. They value independence, courage, and radical honesty. At their best, Rebels are catalysts for necessary change, breaking down oppressive systems to make way for new growth. Their shadow aspects can include destructiveness for its own sake, chronic anger, and inability to cooperate with others. The Rebel's journey involves channeling their revolutionary energy constructively, knowing when to destroy and when to build.",
    traits: [
      "Revolutionary",
      "Courageous",
      "Authentic",
      "Disruptive",
      "Independent",
    ],
    quote: "Rules are meant to be broken.",
    examples: "Prometheus, Malcolm X, Katniss Everdeen",
  },
  {
    id: "magician",
    name: "Magician",
    image: "/archetypes/Magician.jpg",
    shortDescription:
      "The Magician transforms reality through knowledge and connection to higher laws.",
    fullDescription:
      "The Magician archetype represents the energy of transformation, manifestation, and connection to the laws of the universe. Magicians are driven by a desire to understand how things work and to use that knowledge to transform reality. They value wisdom, power, and the alchemical process of turning lead into gold (literally or metaphorically). At their best, Magicians are transformative, insightful, and healing. Their shadow aspects can include manipulation, power-seeking, and unethical use of knowledge. The Magician's journey involves using their power ethically, transforming themselves as well as the world around them.",
    traits: [
      "Transformative",
      "Insightful",
      "Powerful",
      "Visionary",
      "Catalytic",
    ],
    quote: "As above, so below.",
    examples: "Merlin, Marie Curie, Nikola Tesla",
  },
  {
    id: "caregiver",
    name: "Caregiver",
    image: "/archetypes/Caregiver.jpg",
    shortDescription:
      "The Caregiver nurtures others with compassion and selfless generosity.",
    fullDescription:
      "The Caregiver archetype embodies the energy of nurturing, protection, and generosity toward others. Caregivers are driven by compassion and the desire to help those in need. They value empathy, generosity, and the well-being of their community. At their best, Caregivers are compassionate, nurturing, and selfless. Their shadow aspects can include martyrdom, enabling unhealthy behaviors, and neglecting their own needs. The Caregiver's journey involves finding balance between caring for others and caring for themselves, learning when to help and when to allow others to grow through their own challenges.",
    traits: [
      "Compassionate",
      "Nurturing",
      "Generous",
      "Protective",
      "Empathetic",
    ],
    quote: "Love begins by taking care of the closest ones - the ones at home.",
    examples:
      "Mother Teresa, Florence Nightingale, Mrs. Weasley from Harry Potter",
  },
  {
    id: "lover",
    name: "Lover",
    image: "/archetypes/Lover.jpg",
    shortDescription:
      "The Lover seeks connection, passion, and deep appreciation of beauty.",
    fullDescription:
      "The Lover archetype represents the energy of passion, connection, and appreciation of beauty in all its forms. Lovers are driven by the desire for intimate connection, whether with people, experiences, or aesthetic pursuits. They value beauty, emotion, and sensual experience. At their best, Lovers are passionate, committed, and appreciative. Their shadow aspects can include obsession, jealousy, and losing themselves in relationships. The Lover's journey involves developing healthy intimacy, balancing passion with commitment, and finding the beauty in all aspects of life, even the challenging ones.",
    traits: ["Passionate", "Committed", "Appreciative", "Sensual", "Emotional"],
    quote: "Life without love is like a tree without blossoms or fruit.",
    examples: "Romeo and Juliet, Aphrodite, Pablo Neruda",
  },
  {
    id: "warrior",
    name: "Warrior",
    image: "/archetypes/Warrior.jpg",
    shortDescription:
      "The Warrior fights for what matters with courage and discipline.",
    fullDescription:
      "The Warrior archetype embodies courage, discipline, and the willingness to fight for what matters. Warriors are driven by a desire to protect, to overcome challenges, and to achieve their goals through determination and skill. They value strength, courage, and honor. At their best, Warriors are courageous, disciplined, and skilled. Their shadow aspects can include aggression, ruthlessness, and an inability to show vulnerability. The Warrior's journey involves finding causes worth fighting for, developing both outer strength and inner resilience, and knowing when to fight and when to make peace.",
    traits: [
      "Courageous",
      "Disciplined",
      "Skilled",
      "Protective",
      "Determined",
    ],
    quote: "Courage is not the absence of fear, but the triumph over it.",
    examples: "Achilles, Joan of Arc, Mulan",
  },
];
