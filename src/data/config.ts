export const siteConfig = {
  // 1. Core Information
  name: "Ananya",
  birthday: "1998-10-15", // YYYY-MM-DD
  age: 28,
  tagline: "A little experience created for someone very special.",
  secretPassword: "happybirthday", // Password for /secret page

  // 2. Personality Traits for "The Main Character"
  mainCharacterPortrait: "/images/portrait/ananya.jpg",
  personalityTraits: [
    "She's kind.",
    "She's chaotic.",
    "She's stubborn.",
    "She's hilarious.",
    "She's impossible to replace."
  ],

  // 3. Timeline Chapters ("A Life in Moments")
  timeline: [
    {
      year: "1998",
      chapter: "CHAPTER 01",
      title: "THE BEGINNING",
      description: "When the world got a little brighter (and much louder).",
      image: "/images/childhood/baby.jpeg", // placeholder
    },
    {
      year: "2005",
      chapter: "CHAPTER 02",
      title: "THE CHAOS",
      description: "The era of terrible haircuts and missing teeth.",
      image: "/images/childhood/chaos.jpeg",
    },
    {
      year: "2012",
      chapter: "CHAPTER 03",
      title: "THE GROWING UP ERA",
      description: "Figuring things out, one dramatic phase at a time.",
      image: "/images/memories/teen.jpeg",
    },
    {
      year: "2018",
      chapter: "CHAPTER 04",
      title: "THE ADVENTURES",
      description: "Exploring the world and making terrible decisions.",
      image: "/images/memories/adventure.jpeg",
    },
    {
      year: "2026",
      chapter: "CHAPTER 05",
      title: "TODAY",
      description: "Still chaotic. Still amazing.",
      image: "/images/hero/portrait.JPG",
    }
  ],

  // 4. "Things Only We Know" (Flip cards)
  jokes: [
    {
      question: "HER MOST USED PHRASE",
      answer: "\"I literally don't care.\" (She cares deeply)"
    },
    {
      question: "HER WEIRDEST HABIT",
      answer: "Setting 14 alarms and ignoring all of them."
    },
    {
      question: "WHAT MAKES HER ANGRY",
      answer: "When someone eats the snacks she was specifically saving."
    },
    {
      question: "THE THING SHE ALWAYS DOES",
      answer: "Pretends she's full, then eats off your plate."
    }
  ],

  // 5. Family & Friends Messages
  people: [
    {
      name: "Mom & Dad",
      relationship: "Parents",
      image: "/images/family/parents.jpeg",
      message: "We love you so much! Even when you're being impossible. Happy Birthday to our favorite daughter (don't tell the others)."
    },
    {
      name: "Adi",
      relationship: "Brother",
      image: "/images/family/adi.jpeg",
      message: "I built this entire website just to prove I'm the favorite child. Happy birthday weirdo!"
    }
  ],

  // 6. Fake Statistics
  statistics: [
    { label: "LIKELIHOOD OF BEING RIGHT", value: 87, suffix: "%" },
    { label: "LIKELIHOOD OF SAYING \"I'M FINE\"", value: 96, suffix: "%" },
    { label: "MINUTES SPENT DECIDING WHAT TO WEAR", value: 42, suffix: "" },
    { label: "IRREPLACEABLE", value: 100, suffix: "%" }
  ],

  // 7. Future Predictions
  predictions: [
    { year: 2027, text: "A new obsession will appear. It will consume her life for 3 weeks." },
    { year: 2028, text: "She will pretend she doesn't care. She absolutely will." },
    { year: 2030, text: "Someone will finally convince her to wake up early on a weekend." },
    { year: 2035, text: "Still arguing. Still winning." }
  ],

  // 8. Ending Sequence
  ending: {
    beforeYouGo: "AND BEFORE YOU GO...",
    oneLastThing: "There is one last thing\nI want you to know.",
    
    messageHeading: "A LITTLE MESSAGE",
    personalMessage: "I know we fight about stupid things.\nI know I steal your charger and pretend I didn't.\n\nBut I also know that life wouldn't be half as interesting without you.\nThank you for being exactly who you are.\n\nI hope this year brings you everything you've ever wanted, and more.\n\nI'll always have your back.",
    
    finalMemoryImage: "/images/hero/portrait.JPG", // placeholder
    finalMemoryText1: "No matter how much we grow...",
    finalMemoryText2: "I'll always be your brother.",
    
    closingText1: "That's all...",
    closingText2: "for now.",
    signOff: "Made with ❤️ by Adi"
  },

  // 9. Secret Page
  secretContent: {
    title: "This part was made only for you.",
    message: "Here are some memories that didn't make the main page.\nThe ones that are just for us.\n\nKeep shining, Ananya.",
    photos: [
      "/images/secret/1.jpeg",
      "/images/secret/2.jpeg"
    ]
  }
};
