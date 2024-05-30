import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { SearchPage } from "../../../src/heroes/pages/SearchPage";

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate
}));

describe('Pruebas en <SearchPage />', () => {

  beforeEach( () => jest.clearAllMocks);

  test('debe de mostrarse correctamente con valores por defecto', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect( container ).toMatchSnapshot();
  });

  test('debe de mostrar a batman y el input con el valor del queryString', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <SearchPage />
      </MemoryRouter>
    );
    
    const inputValue = screen.getByRole('textbox');
    expect( inputValue.value ).toBe('batman');
    const img = screen.getByRole('img');
    expect( img.src ).toContain('/assets/heroes/dc-batman.jpg');
    const divSearch = screen.getByLabelText('div-search');
    expect( divSearch.style.display ).toBe('none');
  });

  test('debe de mostrar un error si no se encuentra el hero (1234)', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=1234']}>
        <SearchPage />
      </MemoryRouter>
    );
    const divNoHero = screen.getByLabelText('div-no-hero');
    expect( divNoHero.style.display ).toBe('');
  });

  test('debe de llamar el navigate a la plantalla nueva', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <SearchPage />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'superman'}});
    fireEvent.submit( input );
    expect( mockUseNavigate ).toHaveBeenCalled();
  });
});