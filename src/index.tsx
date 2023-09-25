import React from 'react'
import ReactDOM from 'react-dom/client';

export const App = () => {
  return (
     <div>
       <h2>Какое из приведенных ниже определений верно?</h2>
       <ol>
         <li>1 - Команда git push используется для выгрузки содержимого локального репозитория в удаленный репозиторий.
           Она позволяет передать коммиты из локального репозитория в удаленный.
         </li>
         <li>2 - Команда git pull используется для извлечения и загрузки содержимого из удаленного репозитория и
           немедленного обновления локального репозитория этим содержимым.
         </li>
         <li>3 - Команда git fetch загружает коммиты, файлы и ссылки из удаленного репозитория в ваш локальный
           репозиторий. Извлеките данные с помощью команды fetch, если хотите увидеть, над чем работают остальные.
         </li>
         <li>4 - Ни одно из вышеперечисленных определений не верно</li>
       </ol>
     </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App/>);

// 📜 Описание:
// Какое из приведенных ниже определений верно?
// Может быть несколько вариантов ответа (ответ дайте через пробел).
// ❗ Ответ будет засчитан как верный, только при полном правильном совпадении.
// Если указали правильно один вариант (1),
// а нужно было указать два варианта (1 и 2), то ответ в данном случае будет засчитан как неправильный

// 🖥 Пример ответа: 1
// ответила 1 3 - ответ не засчитан