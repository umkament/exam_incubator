import ReactDOM from 'react-dom/client';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

// Styles
const table: React.CSSProperties = {
  borderCollapse: 'collapse',
  width: '100%',
  tableLayout: 'fixed',
}

const th: React.CSSProperties = {
  padding: '10px',
  border: '1px solid black',
  background: 'lightgray',
  cursor: 'pointer'
}

const td: React.CSSProperties = {
  padding: '10px',
  border: '1px solid black'
}

// Types
type UserType = {
  id: string;
  name: string;
  age: number;
}

type UsersResponseType = {
  items: UserType[]
  totalCount: number
}

type ParamsType = {
  sortBy: string | null
  sortDirection: 'asc' | 'desc' | null
}

// API
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const api = {
  getUsers(params?: ParamsType) {
    return instance.get<UsersResponseType>('users', {params})
  },
}

// Reducer
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
const getUsersTC = (searchParams?: ParamsType): AppThunk => (dispatch) => {
  api.getUsers(searchParams)
     .then(res => dispatch(setUsersAC(res.data.items)))
}

export const Users = () => {

  const [activeColumn, setActiveColumn] = useState<ParamsType>({
    sortBy: null,
    sortDirection: 'asc'
  })

  const users = useAppSelector(state => state.app.users)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(activeColumn.sortBy ? getUsersTC(activeColumn) : getUsersTC())
  }, [activeColumn])

  /*const sortHandler = (sortBy: string) => {
    // ❗❗❗ XXX ❗❗❗
    setActiveColumn({
      sortBy,
      sortDirection:
         activeColumn.sortBy === sortBy && activeColumn.sortDirection === 'asc'
            ? 'desc'
            : 'asc'
    });
  };*/

/*
  const sortHandler = (sortBy: string) => {
    setActiveColumn({
      sortBy,
      sortDirection: activeColumn.sortDirection === 'asc' ? 'desc' : 'asc'
    });
  };
*/
  const sortHandler = (sortBy: string) => setActiveColumn({ sortBy, sortDirection: activeColumn.sortDirection === 'asc' ? 'desc' : 'asc' });



  return (
     <div>
       <h1>👪 Список пользователей</h1>
       <table style={table}>
         <thead>
         <tr>
           <th style={th} onClick={() => sortHandler('name')}>
             Name
             {activeColumn?.sortBy === 'name' && (activeColumn.sortDirection === 'asc' ? <span> &#8593;</span> :
                <span> &#8595;</span>)}
           </th>
           <th style={th} onClick={() => sortHandler('age')}>
             Age
             {activeColumn?.sortBy === 'age' && (activeColumn.sortDirection === 'asc' ? <span> &#8593;</span> :
                <span> &#8595;</span>)}
           </th>
         </tr>
         </thead>
         <tbody>
         {
           users.map(u => {
             return (
                <tr key={u.id}>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.age}</td>
                </tr>
             )
           })
         }
         </tbody>
       </table>
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
// Перед вами таблица с пользователями.
// Ваша задача вместо XXX написать код для сортировки пользователей по имени и возрасту.
// Т.е. при нажатии на name либо age пользователи должны сортироваться в таблице.
// При повторном нажатии на этот же столбец сортировка должна происходить в обратном порядке
// ❗ сортировка пользователей происходит на сервере, т.е. sort использовать не нужно

// 🖥 Пример ответа: sort(a, b)