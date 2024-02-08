import React from 'react'
import ReactDOM from 'react-dom/client';

export const App = () => {
  return (
     <div>
       <h2>Чем отличается master от origin master ?</h2>
       <ul>
         <li>1 - Это просто 2 ветки с разными названиями. Их ничего не связывает</li>
         <li>2 - master принадлежит локальному репозиторию, origin master - удаленному</li>
         <li>3 - Это 2 названия одной и той же ветки. Приставка origin не несет никакого смысла.</li>
         <li>4 - Ветки origin master не существует</li>
         <li>5 - Нет правильного ответа</li>
       </ul>
     </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

// 📜 Описание:
// Чем отличается master от origin master ?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1