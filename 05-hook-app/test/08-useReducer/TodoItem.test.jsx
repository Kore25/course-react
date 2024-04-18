import { fireEvent, render, screen } from "@testing-library/react";
import { TodoItem } from "../../src/08-useReducer/TodoItem";

describe('Preubas en <TodoItem />', () => {

    const todo = {
        id: 1,
        description: 'Piedra del alma',
        done: false,
    }

    const removeTodoFuctionMock = jest.fn();
    const toggleTodoFunctionMock = jest.fn();

    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el TODO pendiente de completar', () => {
        render(
            <TodoItem
                todo={ todo }
                removeTodoFuction={ removeTodoFuctionMock }
                toggleTodoFunction={ toggleTodoFunctionMock }
            />
        );

        const liElement = screen.getByRole('listitem');
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toContain('align-self-center');
        expect( spanElement.className ).not.toContain('text-decoration-line-through');
    });

    test('debe de mostrar el TODO completado', () => {
        todo.done = true;

        render(
            <TodoItem
                todo={ todo }
                removeTodoFuction={ removeTodoFuctionMock }
                toggleTodoFunction={ toggleTodoFunctionMock }
            />
        );

        const spanElement = screen.getByLabelText('span');
        expect( spanElement.className ).toContain('text-decoration-line-through');
    });

    test('el span debe de llamar el ToggleFunction cuando hace click', () => {
        render(
            <TodoItem
                todo={ todo }
                removeTodoFuction={ removeTodoFuctionMock }
                toggleTodoFunction={ toggleTodoFunctionMock }
            />
        );

        const spanElement = screen.getByLabelText('span');
        fireEvent.click( spanElement );

        expect( toggleTodoFunctionMock ).toHaveBeenCalledWith( todo.id );

    });

    test('el boton debe de llamar el removeFunction cuando hace click', () => {
        render(
            <TodoItem
                todo={ todo }
                removeTodoFuction={ removeTodoFuctionMock }
                toggleTodoFunction={ toggleTodoFunctionMock }
            />
        );

        const btnElement = screen.getByLabelText('button');
        fireEvent.click( btnElement );

        expect( removeTodoFuctionMock ).toHaveBeenCalledWith( todo.id );

    });
});