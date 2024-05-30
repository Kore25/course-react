import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { PublicRoute } from "../../src/router/PublicRoute";
import { AuthContext } from "../../src/auth";

describe('Pruebas en <PublicRoute />', () => {
  test('debe de mostrar el children si no esta autenticado', () => {
    const contexValue = {
      logged: false,
    }
    render(
      <AuthContext.Provider value={ contexValue }>
        <PublicRoute>
          <h1>Ruta Publica</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Ruta Publica') ).toBeTruthy();
  });

  test('debe de mostrar de navegar si esta autenticado', () => {
    const contexValue = {
      logged: true,
      user: {
        id: 'ABC',
        name: 'Luis',
      }
    }
    render(
      <AuthContext.Provider value={ contexValue }>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="login" element={
              <PublicRoute>
                <h1>Ruta Publica</h1>
              </PublicRoute>
            } />
            <Route path="marvel" element={ <h1>Pagina marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect( screen.getByText('Pagina marvel') ).toBeTruthy();
  });
})