const { renderHook, act } = require("@testing-library/react");
const { useForm } = require("../../src/hooks/useForm");

describe('Pruebas en useForm', () => {

    const initialForm = {
        name: 'Luis',
        email: 'luis@gmail.com',
    }

    test('debe de regresar la información por defecto', () => {
        const { result } = renderHook( () => useForm( initialForm ) );
        expect( result.current ).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function )
        });
    });

    test('debe de cambiar el nombre del formulario', () => {
        const newValue = 'Fernando';
        const { result } = renderHook( () => useForm( initialForm ) );
        const { onInputChange } = result.current;

        act( () => {
            const target = {
                target: {
                    name: 'name',
                    value: newValue,
                }
            }
            onInputChange(target);
        });

        expect( result.current.name ).toBe( newValue );
        expect( result.current.formState.name ).toBe( newValue );
    });

    test('debe de realizar el reset del formulario', () => {
        const newValue = 'Fernando';
        const { result } = renderHook( () => useForm( initialForm ) );
        const { onResetForm, onInputChange } = result.current;

        act( () => {
            const target = {
                target: {
                    name: 'name',
                    value: newValue,
                }
            }
            onInputChange(target);
            onResetForm(target);
        });

        expect( result.current.name ).toBe( initialForm.name );
        expect( result.current.formState.name ).toBe( initialForm.name );
     })
});