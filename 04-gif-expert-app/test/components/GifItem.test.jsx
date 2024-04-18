import { render, screen } from '@testing-library/react';
import { GifItem } from '../../src/components/GifItem';

describe('Pruebas en <GifItem />>', () => {

    const title = 'Dragon ball';
    const url = 'https://images.com/';

    test('debe de hacer match con el snapshot', () => {
        const { container } = render( <GifItem title={ title } url={ url }/> );
        expect( container ).toMatchSnapshot();
    });

    test('debe de mostrar la imagen con el URL y el ALT incidacado', () => {
        render( <GifItem title={ title } url={ url }/> );
        // expect( screen.getByRole('img').src ).toBe(url);
        // expect( screen.getByRole('img').alt ).toBe(title);
        const { src, alt} = screen.getByRole('img');
        expect( alt ).toBe(title);
        expect( src ).toBe(url);
     });

     test('debe de mostrar el titulo en el componente', () => {
        render( <GifItem title={ title } url={ url }/> );
        expect( screen.getByText( title ) ).toBeTruthy();
      })
 });