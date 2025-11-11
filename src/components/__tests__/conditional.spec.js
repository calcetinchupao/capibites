import React from 'react';
import { render, screen } from '@testing-library/react';
import { OfferBadge, ToggleMessage } from '../../components/TestExamples';
import userEvent from '@testing-library/user-event';

describe('Renderizado condicional', () => {
  it('muestra badge cuando enOferta=true y no lo muestra cuando es false', () => {
    const { rerender } = render(<OfferBadge enOferta={true} />);
    expect(screen.getByTestId('badge').textContent).toBe('¡Oferta!');

    rerender(<OfferBadge enOferta={false} />);
    expect(screen.queryByTestId('badge')).toBeNull();
  });

  it('ToggleMessage alterna contenido visible/invisible por estado', async () => {
    const user = userEvent.setup();
    render(<ToggleMessage />);

    // Inicialmente no visible
    expect(screen.queryByTestId('message')).toBeNull();

    // Click muestra mensaje
    await user.click(screen.getByTestId('toggle-btn'));
    expect(screen.getByTestId('message').textContent).toBe('Mensaje visible');

    // Segundo click oculta mensaje
    await user.click(screen.getByTestId('toggle-btn'));
    expect(screen.queryByTestId('message')).toBeNull();
  });
});