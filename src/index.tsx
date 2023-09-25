import ReactDOM from 'react-dom/client';
import React, { useEffect } from 'react';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'


// Reducer
const initState = {find: '', words: [] as string[]}
type InitStateType = typeof initState

const appReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'SET_FIND':
      return {...state, find: action.find}
    case 'SET_WORDS':
      return {...state, words: action.words}
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

const setFind = (find: string) => ({type: 'SET_FIND', find} as const)
const setWords = (words: string[]) => ({type: 'SET_WORDS', words} as const)
type ActionsType = ReturnType<typeof setFind> | ReturnType<typeof setWords>


// Components
const defWords = ['a', 'ab', 'abc', 'b', 'bc', 'c', 'd', 'ac', 'bcd', 'cd', 'abcd', 'bd']

export const App = () => {
  const find = useAppSelector(state => state.app.find)
  const words = useAppSelector(state => state.app.words)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setWords(defWords))
  }, [])

  const mapped = words
     .filter((w: string) => new RegExp(find, 'gi').test(w))
     .map((w: string, i: number) => <div key={i}>{w}</div>)

  const onChangeHandler = (value: string) => {
    console.log(value)
  }

  return (
     <div>
       <input
          value={find}
          onChange={e => onChangeHandler(e.target.value)}
       />
       {mapped}
     </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <Provider store={store}>
     <App/>
   </Provider>
);

// 📜 Описание:
// На экране отображен массив слов.
// Ваша задача починить фильтрацию:
// вводите символы в input и сразу видите как фильтруются данные.
// В качестве ответа укажите исправленную версию строки.
//
// 🖥 Пример ответа: dispatch(setFind(defWords))
