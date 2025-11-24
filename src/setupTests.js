
import '@testing-library/jest-dom'; 
import { vi } from 'vitest';

const mockUsers = [
  { id: 1, name: "Leanne Graham", company: { catchPhrase: 'synergy' } },
  { id: 2, name: "Ervin Howell", company: { catchPhrase: 'blah' } },
  { id: 3, name: "Clementine Bauch", company: { catchPhrase: 'synergy' } },
];

// Reemplazamos la función global 'fetch' con nuestro mock
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUsers),
  })
);

