
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {loginUser} from '../../actions/user_action';
import styles from './LoginRegisterPage.module.css';
import { withRouter } from 'react-router-dom';
function LoginPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    props.history.goBack(1)
                }
                else {
                    alert('Error');
                }
            })
    }

    return (
        <div className={styles.container}>
            <div className={styles.loginRegisterPage}>
                <div className={`${styles.formBox} ${styles.login}`}>
                    <h2>Log In</h2>

                    <hr className={styles.hr} />
                    <form onSubmit={onSubmitHandler}>
                        <label for='email'>Email</label>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder='Enter Email' name='email' id='email' className={styles.input} required></input>

                        <label for='pwd'>Password</label>
                        <input type='password' value={Password} onChange={onPasswordHandler} placeholder='Enter password' name='pwd' id='password' className={styles.input} required></input>

                        <hr className={styles.hr} />

                        <button type='submit' className={styles.button}>Log In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LoginPage)