import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from '../../components/TestExamples';

describe('Eventos de usuario', () => {
  it('envía email y password al hacer submit', async () => {
    const user = userEvent.setup();
    const onLogin = jasmine.createSpy('onLogin');

    render(<LoginForm onLogin={onLogin} />);

    await user.type(screen.getByTestId('email-input'), 'test@correo.com');
    await user.type(screen.getByTestId('password-input'), 'secreto');
    await user.click(screen.getByTestId('submit-btn'));

    expect(onLogin).toHaveBeenCalledTimes(1);
    expect(onLogin).toHaveBeenCalledWith({ email: 'test@correo.com', password: 'secreto' });
  });
});