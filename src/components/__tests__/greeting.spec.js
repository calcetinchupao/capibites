import React from 'react';
import { render, screen } from '@testing-library/react';
import { Greeting } from '../../components/TestExamples';

describe('Props: Greeting', () => {
  it('renderiza el nombre recibido por props', () => {
    render(<Greeting name="Ariel" />);
    const el = screen.getByTestId('greeting');
    expect(el).toBeTruthy();
    expect(el.textContent).toContain('Hola, Ariel');
  });
});