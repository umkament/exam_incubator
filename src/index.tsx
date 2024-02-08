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

type ParamsType = {
  sortBy: string | null;
  sortDirection: "asc" | "desc" | null;
};

// API
const instance = axios.create({ baseURL: "https://exams-frontend.kimitsu.it-incubator.ru/api/" });

const api = {
  getUsers(params?: ParamsType) {
    return instance.get<UsersResponseType>("users", { params });
  },
};

// Reducer
const initState = {
  users: [] as UserType[],
  params: {
    sortBy: null,
    sortDirection: "asc",
  } as ParamsType,
};
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_PARAMS":
      return { ...state, params: { ...state.params, ...action.payload } };
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

const setUsersAC = (users: UserType[]) => ({ type: "SET_USERS", users }) as const;
const setParamsAC = (payload: ParamsType) => ({ type: "SET_PARAMS", payload }) as const;
type ActionsType = ReturnType<typeof setUsersAC> | ReturnType<typeof setParamsAC>;

// Thunk
const getUsersTC = (): AppThunk => (dispatch, getState) => {
  const params = getState().app.params;
  api
     .getUsers(params.sortBy ? params : undefined)
     .then((res) => dispatch(setUsersAC(res.data.items)));
};

export const Users = () => {
  const users = useAppSelector((state) => state.app.users);
  const sortBy = useAppSelector((state) => state.app.params.sortBy);
  const sortDirection = useAppSelector((state) => state.app.params.sortDirection);
  console.log(users, sortBy, sortDirection);

  const dispatch = useAppDispatch();

  useEffect(() => {dispatch(getUsersTC())}, [dispatch, sortBy, sortDirection]);

  const sortHandler = (name: string) => {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    dispatch(setParamsAC({ sortBy: name, sortDirection: direction }));
  };

  return (
     <div>
       <h1>👪 Список пользователей</h1>
       <table style={table}>
         <thead>
         <tr>
           <th style={th} onClick={() => sortHandler("name")}>
             Name
           </th>
           <th style={th} onClick={() => sortHandler("age")}>
             Age
           </th>
         </tr>
         </thead>
         <tbody>
         {users.map((u) => {
           return (
              <tr key={u.id}>
                <td style={td}>{u.name}</td>
                <td style={td}>{u.age}</td>
              </tr>
           );
         })}
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
// Перед вами таблица с пользователями. Но данные не подгружаются
// Что нужно написать вместо XXX, чтобы:
// 1) Пользователи подгрузились
// 2) Чтобы работала сортировка по имени и возрасту
// 3) Направление сортировки тоже должно работать (проверить можно нажав на одно и тоже поле 2 раза)

// 🖥 Пример ответа: console.log(users, sortBy, sortDirection)
