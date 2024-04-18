import { fireEvent, render, screen } from "@testing-library/react";
import MultipleCustomHooks from "../../src/03-examples/MultipleCustomHooks";
import { useCounter, useFetch } from "../../src/hooks";

jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

const data = {
    id: '123',
    name: 'Charizar',
    sprites: {
        front_default: 'https://url1.com',
        back_default: 'https://url2.com',
        front_shiny: 'https://url3.com',
        back_shiny: 'https://url4.com',
    }
}

describe('Pruebas en <MultipleCustomHooks />', () => {

    const mockIncrement = jest.fn();

    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    beforeEach( () => {
        jest.clearAllMocks();
    });

    test('debe de mostrar el componente por defecto', () => {
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null,
        });

        render( <MultipleCustomHooks />);
        expect( screen.getByText('Cargando'));
        expect( screen.getByText('Información de Pokémon'));
        const anteriorButton = screen.getByRole('button', { name: 'Anterior'});
        const siguienteButton = screen.getByRole('button', { name: 'Siguiente'});
        expect( anteriorButton.disabled ).toBeFalsy();
        expect( siguienteButton.disabled ).toBeFalsy();
    });

    test('debe de mostrar un pokemon', () => {

        useFetch.mockReturnValue({
            data: data,
            isLoading: false,
            hasError: null,
        });

        render( <MultipleCustomHooks />);
        // const h2Title = screen.getByRole('h2', { name: '#123 - Charizar'});
        // expect( h2Title ).toBeTruthy();
        const imagenes = screen.getAllByRole('img');
        expect( imagenes.length ).toBe(4);
        // screen.debug();
    });

    test('debe de llamar la funcion de incrementar', () => {
        useFetch.mockReturnValue({
            data: data,
            isLoading: false,
            hasError: null,
        });


        render( <MultipleCustomHooks />);
        const siguienteButton = screen.getByRole('button', { name: 'Siguiente'});
        fireEvent.click( siguienteButton );
        expect( mockIncrement ).toHaveBeenCalled();
    });
});