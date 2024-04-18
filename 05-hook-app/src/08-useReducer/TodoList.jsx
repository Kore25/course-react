import { TodoItem } from "./TodoItem"

export const TodoList = ({ todos = [], removeTodoFuction, toggleTodoFunction }) => {
  return (
    <ul className="list-group">
        {
            todos.map( todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  removeTodoFuction={ id => removeTodoFuction( id )}
                  toggleTodoFunction={ toggleTodoFunction }
                />
            ))
        }
    </ul>
  )
}
