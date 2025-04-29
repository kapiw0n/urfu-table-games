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
            <a className= "auth-tab" href = "#">вход</a>
            <a className= "auth-tab" href = "#">регистрация</a>
          </div>

          <div className='auth-inputs'>
            <div className='auth-input-container'>
              <input type='e-mail' placeholder='E-mail'></input>
              <img className='auth-mail-icon' src = "src/assets/img/email-icon.svg"></img>
            </div>
            <div className='auth-input-container'>
            <input type='password' placeholder='Пароль'></input>
            <img className='auth-password-icon' src = "src/assets/img/password-icon.svg"></img>
            </div>
          </div>
          
          <div className='auth-rememberbox'><input className = "auth-checkbox" type= "checkbox"/><span className='auth-remember'>Запомнить меня</span></div>

          <div className='auth-buttons'>
            <div className='auth-decorline'>
              <a href = "#" className=''><button className = "auth-enter" type = "submit">Войти</button></a>
            </div>
            <a className = "auth-restore-password" href = "#"><p>Забыли пароль?</p></a>

            <a href = "#"><button type="submit" className='auth-google-button'>
            <img className='auth-google-icon' src = "src/assets/img/google-icon.png"></img>
            Продолжить с <b>Google</b>
            </button></a>

          </div>
        </div>
      </div>
    </>
  )
}