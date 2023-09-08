import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom'

const newSum = 1000

const Login = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(`/balance/${newSum}`)
  }, [])

  return (
     <h1>Login</h1>
  )
}

const Balance = () => {
  const [balance, setBalance] = useState(500)

  const params = useParams()

  useEffect( ()=> {
    if (params.bonus) {
      setBalance(prevBalance => prevBalance + newSum)
    }
  },[] )

  return (
     <h1>💵 balance: {balance}</h1>
  )
}

export const Bank = () => {
  return (
     <Routes>
       <Route path={'/'} element={<Login/>}/>
       <Route path={'/balance/:bonus'} element={<Balance/>}/>
     </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
   <BrowserRouter>
     <Bank/>
   </BrowserRouter>
);

// 📜 Описание:
// Перед вами баланс равный 500.
// Ваша задача вместо XXX написать код,
// в результате которого баланс увеличится на сумму указанную в роуте.

// 🖥 Пример ответа: balance = newSum
