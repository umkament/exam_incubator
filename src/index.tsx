import React from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Reducer
const initState = {
  animals: [
    { likes: 0, name: "cat" },
    { likes: 0, name: "dog" },
    { likes: 0, name: "fish" },
    { likes: 0, name: "spider" },
    { likes: 0, name: "bird" },
  ] as { likes: number; name: string }[],
};
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        animals: state.animals.map((animal) => {
          return true ? { ...animal } : animal;
        }),
      };
  }
  return state;
};

// Store
const rootReducer = combineReducers({ app: appReducer });

const store = configureStore({ reducer: rootReducer });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>;
const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const like = (likes: any, name: any) => ({ type: "LIKE", likes, name }) as const;
type ActionsType = ReturnType<typeof like>;

// Components
export const Animals = () => {
  const animals = useAppSelector((state) => state.app.animals);
  const dispatch = useAppDispatch();

  const mapped = animals.map((a: any, i: number) => (
     <div key={i}>
       {a.name}-{a.likes}-<button onClick={() => dispatch(like(a.likes + 1, a.name))}>Like!</button>
     </div>
  ));

  return <div>{mapped}</div>;
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
     <Animals />
   </Provider>,
);

// 📜 Описание:
// На экране отображен список животных.
// Кликните на like и вы увидите, что ничего не происходит.
// Ваша задача починить лайки.
// В качестве ответа укажите исправленную версию строки
//
// 🖥 Пример ответа: -{a.likes + 1}-
