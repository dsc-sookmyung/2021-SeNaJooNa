
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../actions/user_action';
import styles from './LoginRegisterPage.module.css';
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {

    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            'email': Email,
            'password': Password,
            'name': Name
        }

        console.log(body);

        dispatch(registerUser(body))
            .then(response => {
                console.log(response);
                if (response.payload.success) {
                    props.history.push('/login')
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
                    <h2>Register</h2>

                    <hr className={styles.hr} />
                    <form onSubmit={onSubmitHandler}>
                        <label for='email'>Email</label>
                        <input type="email" value={Email} onChange={onEmailHandler} placeholder='Enter Email' name='email' id='email' className={styles.input} required></input>
                       
                        <label for='name'>Name</label>
                        <input type="text" value={Name} onChange={onNameHandler} placeholder='Enter Name' name='name' id='name' className={styles.input} required></input>

                        <label for='pwd'>Password</label>
                        <input type='password' value={Password} onChange={onPasswordHandler} placeholder='Enter password' name='pwd' id='password' className={styles.input} required></input>

                        <label for='confirmpwd'>Confirm Password</label>
                        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder='Enter password' name='pwd' id='password' className={styles.input} required></input>
                        <hr className={styles.hr} />

                        <button type='submit' className={styles.button}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterPage)