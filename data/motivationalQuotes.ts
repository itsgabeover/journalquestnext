// lib/motivationalQuotes.ts
export const fantasyQuotes = [
  "Even the smallest person can change the course of the future. – J.R.R. Tolkien",
  "Courage isn't having the strength to go on. It is going on when you don't have strength. – J.R.R. Tolkien",
  "We are what we believe we are. – C.S. Lewis",
  "You have something worth fighting for. – Brandon Sanderson",
  "Happiness can be found even in the darkest of times if one only remembers to turn on the light. – J.K. Rowling",
  "A wizard is never late, nor is he early. He arrives precisely when he means to. – Gandalf",
];

export function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * fantasyQuotes.length);
  return fantasyQuotes[randomIndex];
}
