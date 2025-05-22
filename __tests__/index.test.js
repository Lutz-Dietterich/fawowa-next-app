import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('Home component contains Header, Main, and Footer components', () => {
  render(<Home />);
  
  // Überprüfen, ob Header vorhanden ist
  const headerElement = screen.getByRole('heading', { name: /Header/i });
  expect(headerElement).toBeInTheDocument();

  // Überprüfen, ob Main-Komponente vorhanden ist
  const mainElement = screen.getByRole('main');
  expect(mainElement).toBeInTheDocument();

  // Überprüfen, ob Footer vorhanden ist
  const footerElement = screen.getByRole('contentinfo');
  expect(footerElement).toBeInTheDocument();
});
