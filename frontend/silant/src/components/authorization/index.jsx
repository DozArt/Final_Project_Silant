import React, {useContext, useState, useEffect} from 'react';
import s from './authorization.module.css'
import { observer } from 'mobx-react-lite'
import { Context } from '@/main'
import InputSample from '../inputText';


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
        setLoginAttemptError('');
        
        if (e.target.value.length < 5) {
            setPasswordError('Неправильный пароль')
        } else {
            setPasswordError('')
        }
    }
    const handleLogin = async (login, password) => {
        try {
            await store.handleLogin(login, password);
            switch_activ()
        } catch (error) {
            console.error('Error during login in form:', error);
            setLoginAttemptError('Неправильный логин или пароль');
        }
    };
    return (
        <>
            {store.isAuth ? (
                <div className={s.user}>
                    <div className={s.user_name}>{store.dataUser.username}</div>
                    <button onClick={() => store.handleLogout()}>Выйти</button>
                </div>
            ) : (
                <a className={s.authorization} onClick={switch_activ} >Authorization</a>
            )
        }
            
            
            <div className={activ ? s.modal_on : s.modal_off} onClick={switch_activ}>
                <div className={s.content} onClick={(event) => event.stopPropagation()}>
                    <a className={s.close} onClick={switch_activ}>X</a>
                    <form onSubmit={e => e.preventDefault()}>
                        <InputSample 
                            label='Логин:'
                            type = 'text'
                            placeholder='login'
                            autoComplete="current-login"
                            onChange={e => emailHandler(e)}
                            errorMesage={loginError}
                        />
                        <InputSample 
                            label='Пароль:'
                            type = 'password'
                            placeholder='password'
                            autoComplete="current-password"
                            onChange={e => passwordHandler(e)}
                            errorMesage={passwordError + loginAttemptError}
                        />
                        <button onClick={() => handleLogin(login, password)} disabled={!validation}>Войти</button>
                    </form>
                </div>
            </div>
        </>
        
    );
};

export default observer(Authorization);