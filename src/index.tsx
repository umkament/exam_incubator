import ReactDOM from 'react-dom/client';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type UserType = {
  id: string;
  name: string;
  age: number;
}

type UsersResponseType = {
  items: UserType[]
  totalCount: number
}

// API
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const api = {
  getUsers(search: string) {
    return instance.get<UsersResponseType>(`users?name=${search}&pageSize=100`)
  },
}


const initState = {users: [] as UserType[]}
type InitStateType = typeof initState

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'SET_USERS':
      return {...state, users: action.users}
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

const setUsersAC = (users: UserType[]) => ({type: 'SET_USERS', users} as const)
type ActionsType = ReturnType<typeof setUsersAC>

// Thunk
const getFriends = (name: string): AppThunk => (dispatch) => {
  api.getUsers(name)
     .then(res => dispatch(setUsersAC(res.data.items)))
}

export const Users = () => {
  const users = useAppSelector(state => state.app.users)
  const dispatch = useAppDispatch()
  const [name, setName] = useState('')
  const [timerId, setTimerId] = useState(0)

  useEffect(() => {
    setTimerId(+setTimeout(() => {
      dispatch(getFriends(name))
    }, 1500))
    return () => clearTimeout(timerId);
  }, [name])

  return (
     <div>
       <input
          value={name}
          onChange={e => setName(e.target.value)}
       />
       {
         users.map(u => {
           return <div key={u.id}>
             <p><b>name</b>: {u.name}</p>
           </div>
         })
       }
     </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Provider store={store}>
     <Users/>
   </Provider>
);

// 📜 Описание:
// На экране input, куда можно вводить символы.
// Откройте Network/ fetch/XHR и поробуйте вводить символы
// Обратите внимание, что все символы которые вы вводите уходят на сервер -
// это плохо.
//
// 🪛 Задача: Починить debounce
// В качестве ответа напишите строку кода которую необходимо исправить или добавить
// для реализации данной задачи
//
// 🖥 Пример ответа: value={name(1500)}
// ответила return () => clearTimeout(timerId);
//ответ засчитан
