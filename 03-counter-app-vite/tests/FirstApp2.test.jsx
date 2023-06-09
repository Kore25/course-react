import { render, screen } from '@testing-library/react';
import { FirstApp } from '../src/FirstApp';

describe('Pruebas en <FirstApp />', () => {
    const title = 'Hola soy goku';
    const subtitle = 'Soy un subtitulo';
    test('Debe hacer match con el snapshot', () => {
        const { container } = render( <FirstApp title={title} /> );
        expect( container ).toMatchSnapshot();
    });

    test('debe de mostra el msj Hola soy goku', () => {
        render( <FirstApp title={title} /> );
        expect( screen.getByText(title) ).toBeTruthy();
        // screen.debug();
    });

    test('debe de mostrar el titulo en un h1', () => {
        render( <FirstApp title={title} /> );
        expect( screen.getByRole('heading', { level: 1 }).innerHTML ).toContain(title);
    });

    test('debe de mostrar el subtitulo enviado por props', () => {
        render( <FirstApp title={title} subtitle={subtitle} /> );
        expect( screen.getAllByText(subtitle).length ).toBe(2);
     });
 });