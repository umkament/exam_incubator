import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Styles
const modal: React.CSSProperties = {
  position: "fixed",
  zIndex: 1,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  backgroundColor: "rgba(23,26,38,0.26)",
};

const modalContent: React.CSSProperties = {
  backgroundColor: "#fefefe",
  margin: "15% auto",
  padding: "20px",
  border: "1px solid #888",
  width: "80%",
};

// Reducer
const initState = { goodThings: [] as any[] };
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        goodThings: [action.thing, ...state.goodThings],
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

const addThing = (thing: any) => ({ type: "LIKE", thing }) as const;
type ActionsType = ReturnType<typeof addThing>;

const Modal = (props: any) => {
  return (
     <div style={modalContent}>
       modal:
       <input value={props.value} onChange={(e) => props.setValue(e.target.value)} />
       <button onClick={props.add}>add</button>
     </div>
  );
};

// Components
export const Animals = () => {
  const goodThings = useAppSelector((state) => state.app.goodThings);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);

  const mapped = goodThings.map((t: any, i: number) => <div key={i}>{t}</div>);

  return (
     <div style={modal}>
       <button onClick={() => setShow(true)}>show modal</button>

       {show && (
          <Modal
             value={value}
             setValue={setValue}
             add={() => {
               dispatch(addThing(value));
               setValue("");
             }}
          />
       )}

       {mapped}
     </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
     <Animals />
   </Provider>,
);

// 📜 Описание:
// Откройте модалку, введите любой текст и нажмите add.
// Введенный текст отобразится снизу, но модалка останется по прежнему видимой.

// 🪛 Задача:
// Необходимо сделать так, чтобы модалка пряталась сразу после добавления элемента
// В качестве ответа укажите строку коду, которую необходимо добавить для реализации данной задачи

// 🖥 Пример ответа: closeModal(true)
