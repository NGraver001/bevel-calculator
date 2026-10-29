// Spreadsheet Sheet 1, B6:B11; all dimensions are inches.
export function calculate({ thickness, edge, depth, diameter }) {
  if (![thickness, edge, depth, diameter].every(Number.isFinite)) return { error: 'Enter a number in every field.' };
  if (thickness <= 0) return { error: 'Blade thickness must be greater than zero.' };
  if (edge < 0) return { error: 'Thin edge thickness cannot be negative.' };
  if (edge >= thickness) return { error: 'Thin edge thickness must be smaller than blade thickness.' };
  if (depth <= 0) return { error: 'Bevel depth B must be greater than zero.' };
  if (![8, 10, 14].includes(diameter)) return { error: 'Choose an 8, 10, or 14 inch contact wheel.' };
  const a = (thickness - edge) / 2;
  const chord = Math.hypot(a, depth);
  if (chord > diameter) return { error: 'This bevel exceeds the wheel’s reach. Reduce bevel depth or choose a larger wheel.' };
  const angle = Math.atan(a / depth) - Math.asin(chord / diameter);
  if (angle < -1e-12) return { error: 'This wheel would cut inside the requested thin edge. Reduce bevel depth, increase the material removed per side, or choose a larger wheel.' };
  const offset = Math.max(0, Math.sin(angle) * diameter / 2);
  return { offset, a };
}
