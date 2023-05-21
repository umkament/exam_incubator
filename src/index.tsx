import axios from 'axios'
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

// Types
type CommentType = {
  postId: string
  id: string
  name: string
  email: string
  body: string
}

// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const commentsAPI = {
  getComments() {
    return instance.get<CommentType[]>('comments')
  }
}

// Reducer
const initState = [] as CommentType[]

type InitStateType = typeof initState

const commentsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'COMMENTS/GET-COMMENTS':
      return action.comments
    default:
      return state
  }
}

const getCommentsAC = (comments: CommentType[]) => ({type: 'COMMENTS/GET-COMMENTS', comments} as const)
type ActionsType = ReturnType<typeof getCommentsAC>

const getCommentsTC = (): ThunkAction<void, RootState, unknown, ActionsType> => (dispatch) => {
  commentsAPI.getComments()
     .then((res) => {
       dispatch(getCommentsAC(res.data))
     })
}


// Store
const rootReducer = combineReducers({
  comments: commentsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// App
export const App = () => {

  const comments = useAppSelector(state => state.comments)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCommentsTC())
  }, [])

  return (
     <>
       <h1>📝 Список комментариев</h1>
       {
         comments.map(c => {
           return <div key={c.id}><b>Comment</b>: {c.body} </div>
         })
       }
     </>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}> <App/></Provider>)

// 📜 Описание:
// Ваша задача стоит в том чтобы правильно передать нужные типы в дженериковый тип ThunkAction<any, any, any, any>.
// Что нужно написать вместо any, any, any, any чтобы правильно типизировать thunk creator?
// Ответ дайте через пробел

// 🖥 Пример ответа: unknown status isDone void