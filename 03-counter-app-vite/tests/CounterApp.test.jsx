import { render, screen } from '@testing-library/react';
import { CounterApp } from '../src/CounterApp';

describe('Pruebas en <CounterApp />', () => {
    const value = 100;
    test('Debe de hacer match con el snapshot', () => {
        const { container } = render( <CounterApp value={value} /> );
        expect( container ).toMatchSnapshot();
    });

    test('Debe de mostrar el valor inicial de 100', () => {
        render( <CounterApp value={value} /> );
        expect( screen.getByRole('heading', { level: 2 }).innerHTML ).toContain(value.toString());
    });
 });