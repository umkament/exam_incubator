import React, { useEffect } from 'react'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import axios from 'axios';

// Utils
console.log = () => {
};

// Api
const instance = axios.create({
  baseURL: 'xxx'
})

const api = {
  getUsers() {
    /* 1 */
    return instance.get('xxx')
  }
}


// Reducer
const initState = {
  isLoading: false,
  users: [] as any[]
}

type InitStateType = typeof initState

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'APP/SET-USERS':
      /* 2 */
      return {...state, users: action.users}
    default:
      return state
  }
}

// Actions
const setUsersAC = (users: any[]) => ({type: 'APP/SET-USERS', users} as const)
type ActionsType = ReturnType<typeof setUsersAC>


// Thunk
const getUsersTC = (): AppThunk => (dispatch) => {
  /* 3 */
  api.getUsers()
     .then((res) => {
       /* 4 */
       dispatch(setUsersAC(res.data.data))
     })
}

// Store
const rootReducer = combineReducers({
  app: appReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Login
export const Login = () => {

  const users = useAppSelector(state => state.app.users)
  /* 5 */

  return (
     <div>
       {/* 6 */}
       {users.map((u) => <p key={u.id}>{u.email}</p>)}
       <h1>В данном задании на экран смотреть не нужно. Рекомендуем взять ручку, листик и последовательно, спокойно
         расставить цифры в нужном порядке. Прежде чем давать ответ обязательно посчитайте к-во цифр и сверьте с
         подсказкой. Удачи 🚀
       </h1>
     </div>
  );
}

// App
export const App = () => {

  /* 7 */
  const dispatch = useAppDispatch()

  useEffect(() => {
    /* 8 */
    dispatch(getUsersTC())
  }, [])

  /* 9 */
  return (
     <Routes>
       <Route path={''} element={<Login/>}/>
     </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}><BrowserRouter><App/></BrowserRouter></Provider>)

// 📜 Описание:
// Задача: напишите в какой последовательности вызовутся числа при успешном запросе.
// Подсказка: будет 11 чисел.
// Ответ дайте через пробел.

// 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 1 2
