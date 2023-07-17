import React from 'react'
import ReactDOM from 'react-dom/client';

export const App = () => {
  return (
     <div>
       <h2>Что нужно прописать в консоли, чтобы создать новую ветку с названием login и перейти на нее ?</h2>
     </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

// 📜 Описание:
// Что нужно прописать в консоли, чтобы создать новую ветку с названием login и перейти на нее ?

// 🖥 Пример ответа: git create login
