import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks() );

  test('debe de invocar el checkingCredentials', async () => {
    await checkingAuthentication()( dispatch );
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
  });

  test('debe de llamar checkingCredentials y login - Exíto', async () => {
    const loginData = { ok: true, ...demoUser };
    await signInWithGoogle.mockResolvedValue( loginData );

    await startGoogleSignIn()( dispatch );
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );

  });

  test('debe de llamar checkingCredentials y login - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error en google' };
    await signInWithGoogle.mockResolvedValue( loginData );

    await startGoogleSignIn()( dispatch );
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ) );
  });

  test('debe de llamar startCreatingUserWithEmailPassword - Exíto', async () => {
    const loginData = { ok: true, ...demoUser };
    await registerUserWithEmailPassword.mockResolvedValue( loginData );

    const data = { email: 'demo@demo.com', password: '123456', displayName: demoUser.displayName };
    await startCreatingUserWithEmailPassword(data)( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });

  test('debe de llamar startCreatingUserWithEmailPassword - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error en google' };
    await registerUserWithEmailPassword.mockResolvedValue( loginData );

    const data = { email: 'demo@demo.com', password: '123456', displayName: demoUser.displayName };
    await startCreatingUserWithEmailPassword(data)( dispatch );

    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ) );
  });

  test('debe de llamar startLoginWithEmailPassword - Exíto', async () => {
    const loginData = { ok: true, ...demoUser };
    await loginWithEmailPassword.mockResolvedValue( loginData );

    const data = { email: 'demo@demo.com', password: '123456' };
    await startLoginWithEmailPassword(data)( dispatch );
    
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
  });

  test('debe de llamar startLoginWithEmailPassword - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error en google' };
    await loginWithEmailPassword.mockResolvedValue( loginData );

    const data = { email: 'demo@demo.com', password: '123456' };
    await startLoginWithEmailPassword(data)( dispatch );
    
    expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    expect( dispatch ).toHaveBeenCalledWith( logout( { errorMessage: loginData.errorMessage } ) );
  });

  test('debe de llamar startLogout', async () => {
    await startLogout()( dispatch );
    expect( logoutFirebase ).toHaveBeenCalled();
    expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
    expect( dispatch ).toHaveBeenCalledWith( logout() );
  });

});