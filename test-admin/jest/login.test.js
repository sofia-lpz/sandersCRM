import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomLoginPage from '../src/loginPage.jsx';

describe('CustomLoginPage', () => {
  test('should render the login page and prevent empty form submission', async () => {
    // render de la pag
    render(
      <MemoryRouter>
        <CustomLoginPage />
      </MemoryRouter>
    );

    // revisa que haya labels
    const usernameField = screen.getByLabelText(/username/i);
    const passwordField = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole('button', { name: /sign in/i });

    // inputs
    expect(usernameField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();

    // manda login vacio
    fireEvent.click(loginButton);

    // asume que hay un error
    expect(await screen.findByText(/username and password are required/i)).toBeInTheDocument();
  });
});