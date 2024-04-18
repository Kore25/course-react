import { TodoList } from "./TodoList";
import { TodoAdd } from "./TodoAdd";
import { useTodo } from "../hooks/useTodo";

export const TodoApp = () => {

   const {
        todos,
        todosCount,
        todosPending,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    } = useTodo();

    return (
        <>
            <h1>TodoApp: { todosCount }, <small>pendientes: { todosPending }</small></h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <TodoList
                        todos={ todos }
                        removeTodoFuction={ handleDeleteTodo }
                        toggleTodoFunction={ handleToggleTodo }
                    />
                </div>

                <div className="col-5">
                    <h4>Agregar todo</h4>
                    <hr />
                    <TodoAdd addTodoFunction={ handleNewTodo } />
                </div>
            </div>

        </>
    )
}
