import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { Link, withRouter } from 'react-router-dom';
import styles from './Header.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Header(props) {

    const user = useSelector(state => state.user)
    const [searchType, setSearchType] = useState("collection")
    const [searchQuery, setSearchQuery] = useState("")

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
                <select className={styles.select} value={searchType} onChange={(e) => { setSearchType(e.target.value) }}>
                    <option value='collection'>컬렉션</option>
                    <option value='place'>장소</option>
                </select>
                <input type='text' placeholder='검색어를 입력하세요' className={styles.input} value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }}>
                </input>
                <button type='submit' className={styles.button} onClick={() => { window.location.href = `/search?type=${searchType}&query=${searchQuery}` }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            {(user.userData && !user.userData.isAuth) ?
                <div className={styles.loginDiv}>
                    <a href="/login" className={styles.login}>로그인</a>
                    &nbsp;&nbsp;<span className={styles.separator}>|</span>&nbsp;&nbsp;
                    <a href="register" className={styles.login}>회원가입</a>
                </div> :
                <div className={styles.loginDiv}>
                    <Link to='/mypage' className={styles.login}>마이페이지</Link>
                    &nbsp;&nbsp;<span className={styles.separator}>|</span>&nbsp;&nbsp;
                    <a onClick={onClickHandler} className={styles.login}>로그아웃</a>
                </div>
            }
        </div>
    )
}

export default withRouter(Header)
