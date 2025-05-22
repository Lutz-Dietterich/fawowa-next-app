import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('Main component contains an H2 element with the text "Main"', () => {
    render(<Home />);

    // Überprüfen, ob Main-Komponente vorhanden ist 
    const mainElement = screen.getByRole('main');
    expect(mainElement).toBeInTheDocument();

    // Überprüfen, ob H2-Element mit dem Text "Main" vorhanden ist
    const h2Element = screen.getByRole('heading', { name: /Main/i });
    expect(h2Element).toBeInTheDocument();
});

