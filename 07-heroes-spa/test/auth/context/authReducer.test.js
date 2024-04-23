import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en authReducer', () => {
    const initialState = {
        logged: false,
    };
    test('debe de retornar el estado por defecto', () => {
        const state = authReducer( initialState, {});
        expect(state).toBe(initialState);
    });
    test('debe de llamar el login autenticar y establecer el user', () => {
        const user = { id: '123', name: 'Luis Carlos' };
        const action = {
            type: types.login,
            payload: user
        }
        const state = authReducer( initialState, action );
        expect( state.logged ).toBeTruthy();
        expect( state.user.id ).toBe( user.id );
        expect( state.user.name ).toBe( user.name );
    });
    test('debe de borrar el name del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: { id: '123', name: 'Luis Carlos' }
        };

        const actionLogout = {
            type: types.logout
        }
        const newState = authReducer( state, actionLogout );
        expect( newState.logged ).toBeFalsy();
        expect( newState.user ).toBeUndefined();
    });
});