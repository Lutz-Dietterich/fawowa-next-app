import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header/index';
test('Header component renders with the correct text', () => {
  render(<Header />);
  
  // Überprüfen, ob der Text "Header" in der gerenderten Komponente vorhanden ist
  const headerElement = screen.getByText('Header');
  expect(headerElement).toBeInTheDocument();
  
  // Überprüfen, ob die H1-Überschrift in der gerenderten Komponente vorhanden ist
  const h1Element = screen.getByRole('heading', { name: /Header/i }); // Das 'i' macht die Suche case-insensitive
  expect(h1Element).toBeInTheDocument();
  
  
});
