import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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
const initState = { tasks: [] as any[] };
type InitStateType = typeof initState;

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case "CHANGE_TASK":
      return {
        ...state,
        tasks: [action.task, ...state.tasks.filter((t: any) => t.id !== action.task.id)],
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

const addTask = (task: any) => ({ type: "ADD_TASK", task }) as const;
const changeTask = (task: any) => ({ type: "CHANGE_TASK", task }) as const;
type ActionsType = ReturnType<typeof addTask> | ReturnType<typeof changeTask>;

// Components
const Modal = (props: any) => {
  const [value, setValue] = useState(props.task?.name || "");

  return (
     <div style={modalContent}>
       modal:
       <input value={value} onChange={(e) => setValue(e.target.value)} />
       <button onClick={() => props.callback(value)}>{props.title}</button>
     </div>
  );
};

const Task = (props: any) => {
  const [show, setShow] = useState(false);

  return (
     <div>
       {props.task.name}
       <button onClick={() => setShow(true)}>change</button>
       {show && (
          <Modal
             task={props.task}
             callback={(value: string) => {
               props.change(value);
               setShow(false);
             }}
             title={"change"}
          />
       )}
     </div>
  );
};

export const Todolist = () => {
  const tasks = useAppSelector((state) => state.app.tasks);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const getId = () => tasks.reduce((acc: number, t: any) => (acc > t.id ? acc : t.id), 0) + 1;

  const mapped = tasks.map((t: any) => (
     <Task
        key={t.id}
        task={t}
        change={(value: string) => dispatch(changeTask({ id: t.id, name: value }))}
     />
  ));

  return (
     <div style={modal}>
       <button onClick={() => setShow(true)}>open modal</button>
       {show && (
          <Modal
             callback={(value: string) => {
               dispatch(addTask({ id: getId(), name: value }));
               setShow(false);
             }}
             title={"add"}
          />
       )}
       {mapped}
     </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
   <Provider store={store}>
     <Todolist />
   </Provider>,
);

// 📜Описание:
// Откройте модалку и добавьте какой-нибудь текст.
// Теперь попробуйте изменить этот текст.
// При изменении существующей таски в инпуте не отображается старые данные.
// Ваша задача починить это поведение.
//
// В качестве ответа укажите строку кода, которую нужно изменить или добавить,
// чтобы реализовать данную задачу
//
// 🖥 Пример ответа: defaultValue={value}

//ответ  task={props.task} добавлен в компонент <Modal/>