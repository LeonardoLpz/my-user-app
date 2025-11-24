import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { expect, test, describe, vi } from 'vitest';
import '@testing-library/jest-dom'; 
import Users  from '../screen/Users'

const mockUsers = [
  { id: 1, name: "Leanne Graham", username: "Bret", email: "Sincere@april.biz", company: { catchPhrase: 'synergy' } },
  { id: 2, name: "Ervin Howell", username: "Antonette", email: "Shanna@melissa.tv", company: { catchPhrase: 'blah' } },
  { id: 3, name: "Clementine Bauch", username: "Samantha", email: "Nathan@yesenia.net", company: { catchPhrase: 'synergy' } },
];


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockUsers),
  })
);


describe('Users Screen', () => {

  test('El filtrado por nombre funciona (typing reduce results)', async () => {
    render(<Users />);

   
    await waitFor(() => {
        expect(screen.getByText(/Leanne Graham/i)).toBeInTheDocument();
    }, { timeout: 2000 });

    const allNames = screen.getAllByRole('heading', { level: 3 });
    expect(allNames).toHaveLength(mockUsers.length); // 3 usuarios cargados

    const filterInput = screen.getByLabelText('Filtro de nombres');

    fireEvent.change(filterInput, { target: { value: 'Ervin' } });

    const filteredNames = screen.getAllByRole('heading', { level: 3 });
    expect(filteredNames).toHaveLength(1);
    
    expect(screen.getByText('Ervin Howell')).toBeInTheDocument();
    
    expect(screen.queryByText('Leanne Graham')).toBeNull();
  });
});