import React, { ChangeEvent, useState } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'


// Types
type LoginFieldsType = {
  email: string
  password: string
}

// API
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const api = {
  login(data: LoginFieldsType) {
    return instance.post('auth/login', data)
  },
}

// Reducer
const initState = {isAuth: false}
type InitStateType = typeof initState

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'SET_AUTH':
      return {...state, isAuth: action.isAuth}
    default:
      return state
  }
}

// Store
const rootReducer = combineReducers({app: appReducer})

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

const setAuth = (isAuth: boolean) => ({type: 'SET_AUTH', isAuth} as const)
type ActionsType = ReturnType<typeof setAuth>


// Thunk
const loginTC = (email: string, password: string): AppThunk => async (dispatch) => {
  try {
    await api.login({email, password})
    dispatch(setAuth(true))
  } catch (e: any) {
    alert(`❌ ${e.response.data.errors} ❌`)
  }
}

// Components
const Login = () => {
  const isAuth = useAppSelector(state => state.app.isAuth)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const [email, setEmail] = useState('darrell@gmail.com')
  const [password, setPassword] = useState('123')

  const changeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const changePasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  if (isAuth) {
    navigate('/profile')
  }

  return (
     <div>
       <input
          type={'text'}
          value={email}
          onChange={changeEmailHandler}
       />
       <input
          type={'password'}
          value={password}
          onChange={changePasswordHandler}
       />
       <button
          disabled={!email || !password}
       >
         login
       </button>
     </div>
  )
}

export const App = () => {
  return (
     <Routes>
       <Route path={'/'} element={<Login/>}/>
       <Route path={'/profile'} element={<h2>😎 Profile</h2>}/>
     </Routes>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <BrowserRouter>
     <Provider store={store}>
       <App/>
     </Provider>
   </BrowserRouter>
);

// 📜 Описание:
// ❗ Email и password менять не надо. Это тестовые данные с которыми будет происходить успешный запрос.
// Помогите разработчику исправить код так, чтобы успешно залогиниться (и редиректнуться на Profile)
// В качестве ответа укажите код, который необходимо добавить, чтобы реализовать данную задачу.

// 🖥 Пример ответа: navigate('/profile')
