import React from 'react'

import styles from './LoginRegisterPage.module.css';

function LoginRegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.loginRegisterPage}>
                <div className={`${styles.formBox} ${styles.login}`}>
                    <h2>Log In</h2>

                    <hr className={styles.hr} />

                    <label for='email'>Email</label>
                    <input type='text' placeholder='Enter Email' name='email' id='email' className={styles.input} required></input>

                    <label for='pwd'>Password</label>
                    <input type='password' placeholder='Enter password' name='pwd' id='password' className={styles.input} required></input>

                    <hr className={styles.hr} />

                    <button type='submit' className={styles.button}>Log In</button>
                </div>

                <div className={`${styles.formBox} ${styles.register}`}>
                    <h2>Register</h2>

                    <hr className={styles.hr} />
                    <div className={styles.registerEmptyBlock}>
                    </div>

                    <button type='submit' className={styles.button}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default LoginRegisterPage
