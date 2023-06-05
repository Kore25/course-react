import { usContext } from "../../src/base-pruebas/06-deses-obj";

describe('Pruebas en 05-funciones', () => {
    test('usContext deberia regresar un objeto', () => {
        const clave = '123abc';
        const edad = 30;
        const testData = {
            nombreClave: clave,
            anios: edad,
            latlng: {
                lat: 14.1232,
                lng: -12.3232
            }
        }
        const user = usContext({clave, nombre: '', edad});
        expect( testData ).toEqual( user );
    });
});