import { fireEvent, render, screen } from "@testing-library/react";
import { UserContext } from "../../src/09-useContext/context/UserContext";
import { LoginPage } from "../../src/09-useContext/LoginPage";

describe('Pruebas en <LoginPage />', () => {

    const user = {
        id: 1,
        name: 'Luis',
    }

    const setUserMock = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el componente sin el usuario', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const preTag = screen.getByLabelText('pre');
        expect( preTag.innerHTML ).toBe('null');
    });

    test('debe de llamar el setUser cuando se jace click en el botton', () => {
        render(
            <UserContext.Provider value={{ user, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        );

        const btnSetUser = screen.getByRole('button');
        fireEvent.click( btnSetUser );

        expect( setUserMock ).toHaveBeenCalledWith( {id: 123, name: 'Luis', email: 'luis@gamil.com'});
    });

});