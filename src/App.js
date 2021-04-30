import React, { useState } from 'react';
import classNames from './App.module.css';

const App = () => {
  const [todoOpen, setTodoOpen] = useState(false);
  const [todos, setTodos] = useState([]);

  const whenTitleEnd = (ev) => setTodoOpen(true);
  const addTodo = (e) => {
    e.preventDefault();

    setTodos([
      ...todos,
      {
        text: e.target.text.value,
        complete: false,
      }
    ]);
  }
  const completeTodo = (i) => () => setTodos(
    todos.map((t, i2) =>
      i2 === i
      ? { ...t, complete: !t.complete }
      : t
    )
  )
  const removeTodo = (i) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    setTodos(
      todos.filter((t, i2) => i2 !== i)
    )
  }
  const completeAll = () =>
    setTodos(todos.map(t => ({ ...t, complete: !t.complete })))
  const removeAllTodo = () => setTodos([])

  return (
    <div className={classNames.app}>
      {todoOpen ? (
        <div className={classNames.todo}>
          <h1>Todo</h1>
          <form className={`${classNames.inputBox}`} onSubmit={addTodo}>
            <input type="text" placeholder="Votre tâche" name="text" />
            <button type="submit">Ajouter une tache</button>
          </form>
          <div className={classNames.btnGroup}>
            <button onClick={completeAll}>Tout cocher</button>
            <button onClick={removeAllTodo}>Tout Supprimer</button>
          </div>
          <div className={classNames.todoCard}>
            {todos.length === 0 && <p>Vous n'avez plus aucune taches :-)</p>}
            {todos.length > 0 && <p>Vous avez {todos.length} tâches</p>}
            {(todos.map((todo, i) => 
              <div className={`${classNames.todoEntry} ${todo.complete ? classNames.complete : ''}`} onClick={completeTodo(i)} key={`todo-${i}`}>
                <p>{todo.text}</p>
                <button onClick={removeTodo(i)}>Supprimer</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={classNames.title} onAnimationEnd={whenTitleEnd}>
          <h1>Bienvenue dans votre Todo list !</h1>
        </div>
      )}
    </div>
  )
}

export default App;