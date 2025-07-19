// data/votes.js
import { nations } from './nations.js';

// Helper: Get 10 random nations, excluding self
const getRandomRecipients = (excludeCode, count = 10) => {
  const all = nations.filter(n => n.code !== excludeCode);
  // Shuffle and pick first 10
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(n => n.code);
};

// Each nation's votes: { 12: "CZE", 10: "NOR", ... }
export const votes = Object.fromEntries(
  nations.map(nation => {
    const recipients = getRandomRecipients(nation.code, 10);
    const pointsOrder = [12, 10, 8, 7, 6, 5, 4, 3, 2, 1];
    return [
      nation.code,
      Object.fromEntries(
        pointsOrder.map((points, i) => [points, recipients[i]])
      )
    ];
  })
);
