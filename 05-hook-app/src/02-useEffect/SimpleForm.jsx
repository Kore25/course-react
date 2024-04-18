import { useEffect, useState } from 'react'
import Messages from './Messages';

export default function SimpleForm() {
    const [formState, setFormState] = useState({
        username: 'kore',
        email: 'kore@gmail.com'
    });

    const { username, email } = formState;

    const onInputChange = ({target}) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value,
        })
    }

    useEffect(() => {
    //   console.log('useEffect called');
    }, []);

    useEffect(() => {
        // console.log('useEffect called form changed');
    }, [formState]);

    useEffect(() => {
        // console.log('useEffect called email changed');
    }, [email]);

    return (
        <>
            <h1>Formulario Simple</h1>
            <hr />

            <input
                type="text"
                className='form-control'
                placeholder='Username'
                name='username'
                value={ username }
                onChange={ onInputChange }
            />

            <input
                type="email"
                className='form-control mt-2'
                placeholder='luis@gmail.com'
                name='email'
                value={ email }
                onChange={ onInputChange }
            />

            {
                (username === 'kore2') && <Messages />
            }
        </>
    )
}
