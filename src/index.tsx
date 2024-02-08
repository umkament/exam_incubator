import React from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = {
  work: 0,
  donate: 0,
  balance: 0,
};
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return {
        ...state,
        ...action.payload,
      };
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

const changeValue = (payload: any) => ({ type: "CHANGE_VALUE", payload }) as const;
type ActionsType = ReturnType<typeof changeValue>;

// Components
export const Income = () => {
  const work = useAppSelector((state) => state.app.work);
  const donate = useAppSelector((state) => state.app.donate);
  const balance = useAppSelector((state) => state.app.balance);

  const dispatch = useAppDispatch();

  return (
     <div>
       <div>
         work:{" "}
         <input
            value={work}
            type={"number"}
            onChange={(e) => dispatch(changeValue({ work: +e.target.value }))}
         />
       </div>
       <div>
         donate:{" "}
         <input
            value={donate}
            type={"number"}
            onChange={(e) => dispatch(changeValue({ donate: +e.target.value }))}
         />
       </div>

       <h1>💵 balance: {balance}</h1>
       <button
          onClick={() => {
            // ❗❗❗ XXX ❗❗❗
          }}
       >
         calculate balance
       </button>
     </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
     <Income />
   </Provider>,
);

// 📜 Описание:
// Что нужно написать вместо XXX, чтобы вывелась сумма дохода в строке баланса
//
// 🖥 Пример ответа: console.log(work + donate)