import React from 'react';
import s from './header.module.css'
import logo_img from '../../../public/images/Logotype.svg'
import big_logo_img from '../../../public/images/Logotype-RGB.svg'


const Header = () => {
    return (
        <div className={s.unit}>
            <div className={s.top_string}>
                <img src={big_logo_img} className={s.logo} />
                <a className={s.contacts}>+1 234 56-78-90, telegram</a>
                <a className={s.authorization}>Authorization</a>
            </div>
            <h3 className={s.title}>Электронно-сервисная книжка "Мой Силант"</h3>
        </div>
    );
};

export default Header;