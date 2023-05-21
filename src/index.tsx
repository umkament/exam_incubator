import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios';

// Types
type TodoType = {
  id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
}

// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const todosAPI = {
  getTodos() {
    return instance.get<TodoType[]>('todos')
  },
  changeTodoStatus(id: string, completed: boolean) {
    return instance.put(`todos/${id}`, {completed})
  }
}


// Reducer
const initState = [] as TodoType[]

type InitStateType = typeof initState

const todosReducer = (state: InitStateType = initState, action: ActionsType) => {
  switch (action.type) {
    case 'TODOS/GET-TODOS':
      return action.todos

    case 'TODOS/CHANGE-TODO-STATUS':
      return state.map((t) => {
        if (t.id === action.todo.id) {
          return {...t, completed: action.todo.completed}
        } else {
          return t
        }
      })

    default:
      return state
  }
}

const getTodosAC = (todos: TodoType[]) => ({type: 'TODOS/GET-TODOS', todos} as const)
const changeTodoStatusAC = (todo: TodoType) => ({type: 'TODOS/CHANGE-TODO-STATUS', todo} as const)
type ActionsType = ReturnType<typeof getTodosAC> | ReturnType<typeof changeTodoStatusAC>

// Thunk
const getTodosTC = (): AppThunk => (dispatch) => {
  todosAPI.getTodos()
     .then((res) => {
       dispatch(getTodosAC(res.data))
     })
}

const changeTodoStatusTC = (id: string, completed: boolean): AppThunk => (dispatch) => {
  todosAPI.changeTodoStatus(id, completed)
     .then((res) => {
       dispatch(changeTodoStatusAC(res.data))
     })
}

// Store
const rootReducer = combineReducers({
  todos: todosReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// App
const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todos)

  useEffect(() => {
    dispatch(getTodosTC())
  }, [])

  const changeStatusHandler = (id: string, completed: boolean) => {
    dispatch(changeTodoStatusTC(id, completed))
  };

  return (
     <>
       <h2>✅ Список тудулистов</h2>
       {
         todos.length ?
            todos.map((t) => {
              return (
                 <div style={t.completed ? {color: 'grey'} : {}} key={t.id}>
                   <input type="checkbox"
                          checked={t.completed}
                          onChange={() => changeStatusHandler(t.id, !t.completed)}
                   />
                   <b>Описание</b>: {t.title}
                 </div>
              )
            })
            : <h2>Тудулистов нету 😥</h2>
       }
     </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}> <App/></Provider>)

// 📜 Описание:
// При загрузке приложения вы должны увидеть список тудулистов,
// но из-за невнимательности была допущена ошибка.
// Найдите и исправьте ошибку.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: type InitStateType = typeof initState