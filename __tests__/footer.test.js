import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
test('Header component renders with the correct text', () => {
  render(<Footer />);
  
  // Überprüfen, ob der Text "Header" in der gerenderten Komponente vorhanden ist
  const headerElement = screen.getByText('Footer');
  expect(headerElement).toBeInTheDocument();
  
  // Überprüfen, ob die H1-Überschrift in der gerenderten Komponente vorhanden ist
  const h1Element = screen.getByRole('heading', { name: /Footer/i }); // Das 'i' macht die Suche case-insensitive
  expect(h1Element).toBeInTheDocument();
  
  
});
