import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/secret/JIUzI1NiIsInR5cCI6IkpXVCJ9')
  }, [])

  return (
     <div>Login</div>
  )
}
const SecretToken = () => {
  const token = localStorage.getItem('token') // FIX

  return (
     <h1>🦾 token: {token}</h1>
  )
}

export const App = () => {
  return (
     <Routes>
       <Route path={'/'} element={<Login/>}/>
       <Route path={'/secret/:token'} element={<SecretToken/>}/>
     </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <BrowserRouter>
     <App/>
   </BrowserRouter>
);

// 📜Описание:
// Исправьте код на 17 строке так, чтобы на странице отобразился токен.

//❗Ответ можно указывать с типизацией и без. Учтено несколько вариантов
// 🖥 Пример ответа: const token = '123'
