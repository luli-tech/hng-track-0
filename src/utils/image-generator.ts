// src/utils/image-generator.ts
import { createCanvas } from 'canvas';
import * as fs from 'fs';
import * as path from 'path';

export async function generateSummaryImage(stats: {
  totalCountries: number;
  topCountries: { name: string; gdp: number }[];
  lastRefreshedAt: Date;
}) {
  const width = 800;
  const height = 600;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#333';
  ctx.font = '28px Arial';
  ctx.fillText('🌍 Country Data Summary', 50, 80);

  ctx.font = '20px Arial';
  ctx.fillText(`Total Countries: ${stats.totalCountries}`, 50, 140);
  ctx.fillText(
    `Last Refreshed: ${stats.lastRefreshedAt.toISOString()}`,
    50,
    180,
  );

  ctx.fillText('Top 5 by Estimated GDP:', 50, 240);
  stats.topCountries.forEach((c, i) => {
    ctx.fillText(`${i + 1}. ${c.name} — ${c.gdp.toFixed(2)}`, 70, 280 + i * 40);
  });

  const filePath = path.resolve('cache/summary.png');
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, canvas.toBuffer('image/png'));
}
