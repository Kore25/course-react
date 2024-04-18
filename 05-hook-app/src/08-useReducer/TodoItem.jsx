export const TodoItem = ({ todo, removeTodoFuction, toggleTodoFunction }) => {
  return (
    <li className="list-group-item d-flex justify-content-between">
        <span
          className={`align-self-center ${ todo.done ? 'text-decoration-line-through' : '' } `}
          onClick={ () => toggleTodoFunction( todo.id ) }
          aria-label="span"
        >
          { todo.description }
        </span>
        <button
          className="btn btn-danger"
          onClick={ () => removeTodoFuction( todo.id ) }
          aria-label="button"
        >
          Borrar
        </button>
    </li>
  )
}
