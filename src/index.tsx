import { useFormik } from 'formik';
import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'


// Main
export const Login = () => {

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
     <form onSubmit={formik.handleSubmit}>
       <div>
         <input
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            placeholder={'Введите имя'}
         />
       </div>
       <div>
         <input
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            placeholder={'Введите фамилию'}
         />
       </div>
       <div>
         <input
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            placeholder={'Введите email'}
         />
       </div>
       <div>
         <input
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder={'Введите пароль'}
            type={'password'}
         />
       </div>
       <div>
         <input
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            placeholder={'Введите телефон'}
         />
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
// Форма заполнения данных работает некорректно.
// Пользователи жалуются на поле ввода "Телефона"
// Найдите в коде ошибку. Исправленную версию строки напишите в качестве ответа.

// 🖥 Пример ответа: <form onSubmit={formik.handleSubmit}>
