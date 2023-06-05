import { getHeroeById, getHeroesByOwner } from "../../src/base-pruebas/08-imp-exp";
import heroes from "../../src/data/heroes";

describe('Pruebas en 08-imp-exp.js', () => {
    test('getHeoreById debe de retornar un heroe por id', () => {
        const id = 1;
        const hero = getHeroeById(id);
        expect( hero ).toEqual({ id: 1, name: 'Batman', owner: 'DC' });
     });
     test('getHeoreById debe de retornar undefined cuando no exista el id', () => {
        const id = 0;
        const hero = getHeroeById(id);
        expect( hero ).toBeFalsy();
     });

     test('getHeroesByOwner debe de retornar un arreglo con los heroes dc', () => {
        const owner = 'DC';
        const heroesin = getHeroesByOwner(owner);
        expect( heroesin.length ).toBe(3);
        expect( heroesin ).toEqual(heroes.filter(h => h.owner === owner));
     });
     test('getHeroesByOwner debe de retornar un arreglo con los heroes marvel', () => {
        const owner = 'Marvel';
        const heroesin = getHeroesByOwner(owner);
        expect( heroesin.length ).toBe(2);
        expect( heroesin ).toEqual(heroes.filter(h => h.owner === owner));
     });
 });