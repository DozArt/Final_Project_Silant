import React from 'react';
import s from './header.module.css'
import logo_img from '/images/Logotype.svg'
import big_logo_img from '/images/Logotype-RGB.svg'
import Authorization from '../authorization';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <div className={s.unit}>
            <div className={s.top_string}>
            <Link to='/machine'><img src={big_logo_img} className={s.logo} /></Link>
                <a className={s.contacts}>+1 234 56-78-90, telegram</a>
                <Authorization />
            </div>
            <h3 className={s.title}>Электронно-сервисная книжка "Мой Силант"</h3>
            
        </div>
    );
};

export default Header;