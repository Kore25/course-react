import React from "react";
import { render, screen } from "@testing-library/react";

import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter } from "react-router-dom";

describe('Prueba en el <PrivateRoute />', () => {
  test('debe de mostrar el children si está autenticado', () => {
    Storage.prototype.setItem = jest.fn();
    const contexValue = {
      logged: true,
      user: {
        id: 'abc',
        name: 'Luis Carlos',
      }
    }
    render(
      <AuthContext.Provider value={ contexValue }>
        <MemoryRouter initialEntries={['/marvel']}>
          <PrivateRoute>
            <h1>Ruta privada</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
  
    expect( screen.getByText('Ruta privada') ).toBeTruthy();
    expect( localStorage.setItem ).toHaveBeenCalledWith("lastPath", "/marvel");
  });
});