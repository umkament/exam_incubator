import { useFormik } from 'formik';
import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


// Types
type LoginFieldsType = {
  firstName: string
  email: string
}

// Main
export const Login = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      email: '',
    },
    validate: (values) => {
      const errors: Partial<LoginFieldsType> = {};

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  // Функция необходима для того, чтобы вебшторм не ругался на true в JSX
  const getTrue = () => {
    return true
  }

  return (
     <form onSubmit={formik.handleSubmit}>
       <div>
         <input placeholder={'Введите имя'} {...formik.getFieldProps('firstName')}/>
       </div>
       <div>
         <input placeholder={'Введите email'}{...formik.getFieldProps('email')}/>
         {getTrue() && <div style={{color: 'red'}}>ERROR</div>}
       </div>
       <button type="submit">Отправить</button>
     </form>
  );
}

// App
export const App = () => {
  return (
     <Routes>
       <Route path={''} element={<Login/>}/>
     </Routes>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<BrowserRouter><App/></BrowserRouter>)

// 📜 Описание:
// Загрузив приложение вы увидите ошибку под полем email, но вы еще ничего не ввели.
// Исправьте 46 строку кода так, чтобы:
// 1) Сообщение об ошибке показывалось только в том случае, когда email введен некорректно.
// 2) Вместо ERROR должен быть конкретный текст ошибки прописанный в валидации к этому полю.
// 3) Сообщение должно показываться только в том случае, когда мы взаимодействовали с полем.
// Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: {true && <div style={{color: 'red'}}>error.email</div>}
