import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "auth-content">

        <h1 className = "auth-heading">Настольные игры УрФУ</h1>

        <div className = "auth-panel">

          <div className = "auth-tabs">
            <a className= "auth-tab" href = "#"><p>вход</p></a>
            <a className= "auth-tab" href = "#"><p>регистрация</p></a>
          </div>

          <div className='auth-inputs'>
            <input type='e-mail' placeholder='E-mail'></input>
            <input type='password' placeholder='Пароль'></input>
            
            <div className=''><input type="checkbox"/><span className='auth-remember'>Запомнить меня</span></div>

            <button type = "submit">Войти</button>
          </div>
          
          <div className='auth-decorline'></div>
          
          <a className = "auth-restore-password" href = "#"><p>Забыли пароль?</p></a>
          <button type="submit" className='auth-google-button'>Продолжить с <b>Google</b></button>

        </div>
      </div>
    </>
  )
}