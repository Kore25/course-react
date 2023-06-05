import { getUser, getUsuarioActivo } from "../../src/base-pruebas/05-funciones";

describe('Pruebas en 05-funciones', () => {
    test('getUser debe re retornar un objeto', () => {
        const testUser = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        };
        const user = getUser();
        expect( testUser ).toEqual( user );
     });

    test('getUsuarioActivo debe retornar un objeto', () => {
        const username = 'Luis Carlos';
        const testUser = {
            uid: 'ABC567',
            username,
        };
        const user = getUsuarioActivo(username);
        expect( testUser ).toEqual( user );
        expect( username ).toBe( user.username );
    });
 });