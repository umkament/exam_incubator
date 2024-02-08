import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import axios from "axios";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const table: React.CSSProperties = {
  borderCollapse: "collapse",
  width: "100%",
  tableLayout: "fixed",
};

const th: React.CSSProperties = {
  padding: "10px",
  border: "1px solid black",
  background: "lightgray",
  cursor: "pointer",
};

const td: React.CSSProperties = {
  padding: "10px",
  border: "1px solid black",
};

// Types
type UserType = {
  id: string;
  name: string;
  age: number;
};

type UsersResponseType = {
  items: UserType[];
  totalCount: number;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
  getUsers() {
    return instance.get<UsersResponseType>("users");
  },
};

// Reducer
const initState = {
  users: [] as UserType[],
};
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "SET-USERS":
      return { ...state, users: action.users };
    default:
      return state;
  }
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const setUsersAC = (users: UserType[]) => ({ type: "SET-USERS", users });
type ActionsType = ReturnType<typeof setUsersAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
  api.getUsers().then((res) => dispatch(setUsersAC(res.data.items)));
};

// Components
export const Users = () => {
  const users = useAppSelector((state) => state.app.users);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersTC());
  }, []);

  return (
     <div>
       <h1>👪 Список пользователей</h1>
       <table style={table}>
         <thead>
         <tr>
           <th style={th}> Name</th>
           <th style={th}> Age</th>
         </tr>
         </thead>
         <tbody>
         {users.map((u) => (
            <tr key={u.id}>
              <td style={td}>{u.name}</td>
              <td style={td}>{u.age}</td>
            </tr>
         ))}
         </tbody>
       </table>
     </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
     <Users />
   </Provider>,
);

// 📜 Описание:
// Перед вами пустая таблица. Пользователи не подгрузились, т.к. в коде допущена ошибка
// Ваша задача найти багу, чтобы таблица с пользователями подгрузилась.
// В качестве укажите исправленную строку кода
// ❗ Есть несколько вариантов решения данной задачи, в ответах учтены различные варианты

// 🖥 Пример ответа: {users.map(u)=> таблица отрисуйся ВЖУХ ВЖУХ}

// Ответ в кейсе исправила на SET-USERS
//Ошибка возникает из-за неправильно заданного типа действия в редюсере.
// В редюсере используется строка "SET-USERS", а в экшене задается "SET_USERS".