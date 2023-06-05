
describe('Pruebas en <DemoComponent />', () => {
    test('should first test', () => {
        /**
         * 1. Inicializacion
         * 2. Estimulo
         * 3. Observar el comportamiento ... esperado
         */
        const message1 = 'Hola Mundo';
        const message2 = message1.trim();
        expect(message1).toBe(message2);
     });
 })
