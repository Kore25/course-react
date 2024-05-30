import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Navbar } from "../../../src/ui";
import { AuthContext } from "../../../src/auth/context/AuthContext";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <Navbar />', () => {

  const contextValue = {
    logged: true,
    user: {
      id: '112',
      name: 'Luis Carlos'
    },
    logout: jest.fn(),
  }

  beforeEach( () => jest.clearAllMocks() );

  test('debe de mostrar el nombre del usuario loggeado', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect( screen.getByText( contextValue.user.name ) ).toBeTruthy();

  });

  test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={ contextValue }>
          <Navbar />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    const logoutBtn = screen.getByRole('button', { name: 'Logout'});
    fireEvent.click(logoutBtn);
    expect(contextValue.logout).toHaveBeenCalled();
    expect( mockUseNavigate ).toHaveBeenCalledWith('/login', {'replace': true});
  });

});