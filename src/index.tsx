import ReactDOM from 'react-dom/client';
import React, { useEffect, useState } from 'react'

export const Mining = () => {
  const [btc, setBtc] = useState(0)

  useEffect(() => {
    setInterval(() => {
       let prevState = 0
      setBtc(prevState++)
      // ❗❗❗ XXX ❗❗❗
    }, 1000)
  }, [])

  return (
     <h1>🪙 BTC: {btc}</h1>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Mining/>);

// 📜 Описание:
// Помогите разработчику намайнить биткоинов.
// Что-то не майнятся 😥.
// Что необходимо написать вместо XXX чтобы биткоины майнились (каждую секунду прибавлялся 1 биткоин) ?
// ❗В качестве переменной используйте значение prevState

// 🖥 Пример ответа: btc = 1000000
