import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'
import React from 'react'

type UserType = {
  id: number
  name: string
  avatar: string
  age: number
  address: string
}

const users: UserType[] = [
  {
    id: 1,
    name: 'my Name',
    age: 32,
    avatar: '—ฅ/ᐠ.̫ .ᐟ\\ฅ—',
    address: 'my Address'
  },
  {
    id: 2,
    name: 'John',
    age: 22,
    avatar: ':)',
    address: 'California'
  },
  {
    id: 3,
    name: 'Mike',
    age: 18,
    avatar: '^._.^',
    address: 'New York'
  },
  {
    id: 4,
    name: 'Emma',
    age: 38,
    avatar: '/ᐠ-ꞈ-ᐟ\\',
    address: 'Washington'
  },
]

const StartPage = () => {
  const navigate = useNavigate()
  const friends = users.filter(u => u.id !== 1)

  const mappedFriends = friends.map((f, i) => {
    const go = () => {
      navigate('/friend/' + f.id)
    }

    return (
       <div key={i} onClick={go} style={{paddingLeft: 24, color: 'blue', cursor: 'pointer'}}>
         {f.name}, {f.age}
       </div>
    )
  })

  return (
     <div>
       <h2>🙂 My profile</h2>
       <Profile userId={1}/>
       <hr/>
       <h2>👪 Friends</h2>
       {mappedFriends}
     </div>
  )
}
const Profile: React.FC<{ userId?: number }> = ({userId}) => {
  const {id} = useParams<{ id: string }>()
  const user = users.find(u => u.id === +(id || userId || 0))

  return (
     <div>
       <div>
         <b>avatar</b> {user?.avatar}
       </div>
       <div>
         <div><b>name</b>: {user?.name}</div>
         <div><b>age</b>: {user?.age}</div>
         <div><b>address</b>: {user?.address}</div>
       </div>
     </div>
  )
}

export const Friends = () => {
  return (
     <Routes>
       <Route path={'/'} element={<StartPage/>}/>
       <Route path={'friend/:id'} element={<Profile/>}/>
       <Route path={'*'} element={<div>❌404 Page Not Found❌</div>}/>
     </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <BrowserRouter>
     <Friends/>
   </BrowserRouter>
);

// 📜 Описание:
// При загрузке приложения на экране отображается
// профиль пользователя и список друзей.
// Если кликнуть на пользователя, то видим ❌404 Page Not Found❌
// Исправьте код, чтобы по клику на пользователя
// отображалась странице с информацией о друге.
// В качестве ответа укажите исправленную строку кода.
//
// 🖥 Пример ответа: <Profile userId={4}/>
// ответ <Route path={'friend/:id'} element={<Profile/>}/>  - засчитан