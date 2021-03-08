import React from 'react'

import styles from './LoginRegisterPage.module.css';

function LoginRegisterPage() {
    return (
        <div className={styles.loginRegisterPage}>
            <div className={styles.login}>
                <h3>Log In</h3>

                <hr className={styles.hr} />

                <label for='email'>Email</label><br />
                <input type='text' placeholder='Enter Email' name='email' id='email' className={styles.input} required></input>

                <label for='pwd'>Password</label><br />
                <input type='password' placeholder='Enter password' name='pwd' id='password' className={styles.input} required></input>

                <hr className={styles.hr} />

                <button type='submit' className={styles.button}>Log In</button>
            </div>
            {/* vertical line */}
            <div className={styles.register}>
                <h3>Register</h3>

                <hr className={styles.hr} />

                <button type='submit' className={styles.button}>Register</button>
            </div>
        </div>
    )
}

export default LoginRegisterPage
