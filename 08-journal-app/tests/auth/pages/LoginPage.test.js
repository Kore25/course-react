import { fireEvent, render, screen } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice, startGoogleSignIn } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginwhithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginwhithEmailPassword({email, password})
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}))

const store = configureStore({
  reducer:{
    auth: authSlice.reducer
  },
  preloadedState: {
    auth: notAuthenticatedState
  }
});

describe('Pruebas en <LoginPage />', () => {

  beforeEach(() => jest.clearAllMocks() );

  test('debe de mostrar el componente correctamente', () => {
    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
  });

  test('boton de google debe de llamar el startGoogleSignIn', () => {
    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );
    const btnGoogle = screen.getByLabelText('google-btn');
    fireEvent.click( btnGoogle );
    expect( mockStartGoogleSignIn ).toHaveBeenCalled();
  });

  test('submit debe de llamar el startLoginWhitEmailAndPassword', () => {

    const email = 'luis@test.com';
    const password = '123456';

    render(
      <Provider store={ store }>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change( emailField, { target: { name: 'email', value: email }});

    const passwordField = screen.getByTestId('password');
    fireEvent.change( passwordField, { target: { name: 'password', value: password }});
    
    const form = screen.getByLabelText('sumbit-form');
    fireEvent.submit( form );

    expect( mockStartLoginwhithEmailPassword ).toHaveBeenCalledWith({ email, password });

  });

});