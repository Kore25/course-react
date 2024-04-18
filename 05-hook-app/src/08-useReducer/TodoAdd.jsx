import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'

export const TodoAdd = ({ addTodoFunction }) => {
    const { description, onInputChange, onResetForm} = useForm({
        description: ''
    });

    const onSubmit = (event) => {
        event.preventDefault();
        if( description.length <= 1 ) return;
        const newTodo = {
            id: new Date().getTime(),
            done: false,
            description,
        }

        addTodoFunction(newTodo);
        onResetForm();
    }

    return (
        <form>
            <input
                type="text"
                placeholder="Que hay que hacer"
                className="form-control"
                name='description'
                value={ description }
                onChange={ onInputChange }
            />

            <button
                type="submit"
                className="btn btn-primary mt-2"
                onClick={ onSubmit }
            >
                agregar
            </button>
        </form>
    )
}
