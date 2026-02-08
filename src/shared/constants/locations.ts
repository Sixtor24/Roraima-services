export const LOCATIONS = [
  'Puerto Ordaz',
  'San Félix',
  'Ciudad Guayana',
  'Upata',
  'Tumeremo',
  'El Callao',
] as const;

export type Location = typeof LOCATIONS[number];
