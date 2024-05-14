import React, {useContext, useState, useEffect} from 'react';
import s from './authorization.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'


const Authorization = () => {
    const {store} = useContext(Context)
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [activ, setActiv] = useState(false)
    const [loginError, setLoginError] = useState('Введите корректные данные')
    const [passwordError, setPasswordError] = useState('Неправильный пароль')
    const [validation, setValidation] = useState(false)
    const [loginAttemptError, setLoginAttemptError] = useState('');

    const switch_activ = () => {
        setActiv(!activ)
    }

    useEffect(() => {
        if ((loginError || passwordError || loginAttemptError)) {
            setValidation(false)
        } else {
            setValidation(true)
        }
    }, [loginError, passwordError, loginAttemptError])

    const emailHandler = (e) => {
        setLogin(e.target.value)
        const re_name =  /^[a-z0-9_\.]+$/

        if (re_name.test(String(e.target.value).toLowerCase())) {
            setLoginError('')
        } else {
            setLoginError('Введите корректные данные')
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)

        if (e.target.value.length < 5) {
            setPasswordError('Неправильный пароль')
        } else {
            setPasswordError('')
            setLoginAttemptError('');
        }
    }
    const handleLogin = async (login, password) => {
        try {
            await store.handleLogin(login, password);
        } catch (error) {
            console.error('Error during login in form:', error);
            // setLoginAttemptError('Неправильный логин или пароль');
        }
    };
    return (
        <>
            {store.isAuth ? (
                <div>
                    {store.dataUser.username}
                    <button onClick={() => store.handleLogout()}>Выйти</button>
                </div>
            ) : (
                <a className={s.authorization} onClick={switch_activ} >Authorization</a>
            )
        }
            
            
            <div className={activ ? s.modal_on : s.modal_off} onClick={switch_activ}>
                <div className={s.content} onClick={(event) => event.stopPropagation()}>
                    <button className={s.close} onClick={switch_activ}>X</button>
                        <form onSubmit={e => e.preventDefault()}>
                            <input 
                                // onBlur={e => blurHandler(e)}
                                // value={value}
                                type = 'text'
                                placeholder='login'
                                autoComplete="current-login"
                                onChange={e => emailHandler(e)}
                            />
                            <input 
                                // onBlur={e => blurHandler(e)}
                                // value={value}
                                type = 'password'
                                placeholder='password'
                                autoComplete="current-password"
                                onChange={e => passwordHandler(e)}
                            />
                            <button onClick={() => handleLogin(login, password)} disabled={!validation}>Войти</button>
                        </form>
                </div>
            </div>
        </>
        
    );
};

export default observer(Authorization);