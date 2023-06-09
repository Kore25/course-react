import { getImagen } from "../../src/base-pruebas/11-async-await";

describe('Pruebas en 11-async-await.js', () => {
    test('getImagen debe de regrar un URL de la imagen', async () => {

        const url = await getImagen();
        expect( typeof url ).toBe('string');
    });
 })