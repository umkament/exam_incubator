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
  baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'
})

const api = {
  getUsers() {
    return instance.get('users')
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
      /* 1 */
      console.log('1')
      return {...state, users: action.users}
    case 'APP/IS-LOADING':
      /* 2 */
      console.log('2')
      return {...state, isLoading: action.isLoading}
    default:
      return state
  }
}

// Actions
const setUsersAC = (users: any[]) => ({type: 'APP/SET-USERS', users} as const)
const setLoadingAC = (isLoading: boolean) => ({type: 'APP/IS-LOADING', isLoading} as const)
type ActionsType = | ReturnType<typeof setUsersAC> | ReturnType<typeof setLoadingAC>


// Thunk
const getUsersTC = (): AppThunk => (dispatch) => {
  /* 3 */
  console.log('3')
  dispatch(setLoadingAC(true))
  api.getUsers()
     .then((res) => {
       /* 4 */
       console.log('4')
       dispatch(setLoadingAC(false))
       /* 5 */
       console.log('5')
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


// Loader
export const Loader = () => {
  /* 6 */
  console.log('6')
  return (
     <h1>Loading ...</h1>
  )
}


// Login
export const Login = () => {
  /* 7 */
  console.log('7')
  const users = useAppSelector(state => state.app.users)
  const isLoading = useAppSelector(state => state.app.isLoading)

  return (
     <div>
       {isLoading && <Loader/>}
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
  /* 8 */
  console.log('8')
  const dispatch = useAppDispatch()

  useEffect(() => {
    /* 9 */
    console.log('9')
    dispatch(getUsersTC())
  }, [])

  /* 10 */
  console.log('10')
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
// Подсказка: будет 13 чисел.
// Ответ дайте через пробел.

// 🖥 Пример ответа: 1 2 3 4 5 6 7 8 9 10 1 2 3
