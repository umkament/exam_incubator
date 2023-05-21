import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios';



// Types
type PostDomainType = PostType & {
  isDisabled: boolean
}

type PostType = {
  body: string
  id: string
  title: string
  userId: string
}


// Api
const instance = axios.create({baseURL: 'https://exams-frontend.kimitsu.it-incubator.ru/api/'})

const postsAPI = {
  getPosts() {
    return instance.get<PostType[]>('posts')
  },
  deletePost(id: string) {
    return instance.delete<{ message: string }>(`posts/${id}?delay=3`)
  }
}


// Reducer
const initState = {
  isLoading: false,
  posts: [] as PostDomainType[]
}

type InitStateType = typeof initState

const postsReducer = (state: InitStateType = initState, action: ActionsType): InitStateType => {
  switch (action.type) {
    case 'POSTS/GET-POSTS':
      return {
        ...state, posts: action.posts.map(t => {
          return {...t, isDisabled: false}
        })
      }

    case 'POSTS/DELETE-POST':
      return {...state, posts: state.posts.filter(t => t.id !== action.id)}

    case 'POSTS/IS-LOADING':
      return {...state, isLoading: action.isLoading}

    case 'POSTS/IS-DISABLED':
      return {
        ...state, posts: state.posts.map((t) => {
          if (t.id === action.id) {
            return {...t, isDisabled: action.isDisabled}
          } else {
            return t
          }
        })
      }

    default:
      return state
  }
}

const getPostsAC = (posts: PostType[]) => ({type: 'POSTS/GET-POSTS', posts} as const)
const deletePostAC = (id: string) => ({type: 'POSTS/DELETE-POST', id} as const)
const setLoadingAC = (isLoading: boolean) => ({type: 'POSTS/IS-LOADING', isLoading} as const)
const setIsDisabled = (isDisabled: boolean, id: string) => ({type: 'POSTS/IS-DISABLED', isDisabled, id} as const)
type ActionsType =
   | ReturnType<typeof getPostsAC>
   | ReturnType<typeof deletePostAC>
   | ReturnType<typeof setLoadingAC>
   | ReturnType<typeof setIsDisabled>

// Thunk
const getPostsTC = (): AppThunk => (dispatch) => {
  postsAPI.getPosts()
     .then((res) => {
       dispatch(getPostsAC(res.data))
     })
}

const deletePostTC = (id: string): AppThunk => (dispatch) => {
  dispatch(setIsDisabled(true, id))
  dispatch(setLoadingAC(true))
  postsAPI.deletePost(id)
     .then((res) => {
       dispatch(deletePostAC(id))
       dispatch(setLoadingAC(false))
     })
}

// Store
const rootReducer = combineReducers({
  posts: postsReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk))
type RootState = ReturnType<typeof store.getState>
type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>
const useAppDispatch = () => useDispatch<AppDispatch>()
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


// Loader
export const Loader = () => {
  return (
     <h1>Loading ...</h1>
  )
}

// App
const App = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)
  const isLoading = useAppSelector(state => state.posts.isLoading)

  useEffect(() => {
    dispatch(getPostsTC())
  }, [])

  const deletePostHandler = (id: string) => {
    dispatch(deletePostTC(id))
  };

  return (
     <div>
       <div style={{position: 'absolute', top: '0px'}}>
         {isLoading && <Loader/>}
       </div>
       <div style={{marginTop: '100px'}}>
         <h1>📜 Список постов</h1>
         {posts.map(p => {
           return (
              <div key={p.id}>
                <b>title</b>: {p.title}
                <button style={{marginLeft: '15px'}}
                        onClick={() => deletePostHandler(p.id)}
                >
                  удалить пост
                </button>
              </div>
           )
         })}
       </div>
     </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}> <App/></Provider>)

// 📜 Описание:
// Перед вами список постов.
// Откройте network и быстро нажмите на кнопку удалить пост несколько раз подряд.
// Откройте вкладку Preview и проанализируйте ответ с сервера
// Первое сообщение будет "Post has been successfully deleted",
// а следующие "Post with id: 63626ac315d01f80765587ee does not exist"
// Т.е. бэкенд первый раз удаляет, а потом уже не может, т.к. пост удален из базы данных.

// Ваша задача при первом клике задизаблить кнопку удаления,
// соответсвенно не давать пользователю возможности слать повторные запросы
// Необходимую строку кода для решения этой задачи напишите в качестве ответа.

// 🖥 Пример ответа: style={{marginRight: '20px'}}
