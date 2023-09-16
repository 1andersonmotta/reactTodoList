// import { PropTypes } from "prop-types"

const Todo = ({ todo }) => {
    return (
        <div className="todo" key={todo.id}>
            <div className="content">
                <p>{todo.text}</p>
                <p className='category'>({todo.category})</p>
            </div>
            <div>
                <button>Completar</button>
                <button>x</button>
            </div>
        </div>
    )
}

export default Todo

// Todo.propTypes = {
//     todo: PropTypes.object
// }.isRequired