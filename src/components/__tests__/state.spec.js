import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../../components/TestExamples';

describe('State: Counter', () => {
  it('incrementa el contador al hacer click', async () => {
    const user = userEvent.setup();
    render(<Counter />);

    expect(screen.getByTestId('count').textContent).toContain('0');
    await user.click(screen.getByTestId('inc-btn'));
    expect(screen.getByTestId('count').textContent).toContain('1');
    await user.click(screen.getByTestId('inc-btn'));
    expect(screen.getByTestId('count').textContent).toContain('2');
  });
});