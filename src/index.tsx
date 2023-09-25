import ReactDOM from 'react-dom/client';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import React from 'react';

// Reducer
const initState = {
  goodMorning: [
    {id: 1, name: 'errors'},
    {id: 2, name: 'bugs'},
    {id: 3, name: 'fackups'},
    {id: 4, name: 'laziness'},
    {id: 5, name: 'work'},
  ] as { id: number, name: string }[]
}

type InitStateType = typeof initState

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'DELETE':
      return {
        ...state,
        goodMorning: state.goodMorning
           .filter(g => g.id !== action.id)
      }
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

const deleteSome = (id: any) => ({type: 'DELETE', id} as const)
type ActionsType = ReturnType<typeof deleteSome>

// Components
export const Monday = () => {
  const goodMorning = useAppSelector(state => state.app.goodMorning)
  const dispatch = useAppDispatch()

  const mapped = goodMorning
     .map((p: any, i: number) => (
        <div key={i}>
          {p.name}
          <button onClick={() => dispatch(deleteSome(p.id))}> X </button>
        </div>
     ))

  return (
     <div>
       {mapped}
     </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Provider store={store}>
     <Monday/>
   </Provider>
);

// 📜 Описание:
// На экране отображен список дел.
// Попробуйте удалить какой-нибудь элемент - у вас не получится.
// Найдите ошибку.
// В качестве ответа укажите исправленную версию строки
//
// 🖥 Пример ответа: delete goodMorning
// ответ <button onClick={() => dispatch(deleteSome(p.id))}> X </button>
// ответ засчитан