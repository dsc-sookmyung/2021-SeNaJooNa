import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Header(props) {

    const user = useSelector(state => state.user)

    const onClickHandler = () => {
        axios.get('api/users/logout')
            .then(response => {
                if (response.data.success) {
                    props.history.push("/login")
                } else {
                    alert("로그아웃 실패");
                }
            })
    }


    return (
        <div className={styles.header}>
            <div className={styles.logoDiv}>
                <a href="/" className={styles.logo}>OurPlace</a>
            </div>
            <div className={styles.search}>
                <select className={styles.select}>
                    <option value='collection'>컬렉션</option>
                    <option value='place'>장소</option>
                </select>
                <input type='text' placeholder='Search..' className={styles.input}>
                </input>
                <button type='submit' className={styles.button}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {(user.userData && !user.userData.isAuth) ?
                <div className={styles.loginDiv}>
                    <a href="/login"  className={styles.login}>LOG IN</a>
                    &nbsp;&nbsp;<span className={styles.separator}>|</span>&nbsp;&nbsp;
                    <a href="register"  className={styles.login}>REGISTER</a>
                </div> :
                <div className={styles.loginDiv}>
                    <Link to='/mypage' className={styles.login}>MY PAGE</Link>
                    &nbsp;&nbsp;<span className={styles.separator}>|</span>&nbsp;&nbsp;
                    <a onClick={onClickHandler}  className={styles.login}>LOGOUT</a>
                </div>
            }
        </div>
    )
}

export default withRouter(Header)
