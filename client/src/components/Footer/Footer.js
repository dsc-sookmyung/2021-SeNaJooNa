import React from 'react'

import styles from './Footer.module.css';

function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.logo}>
                OurPlace
            </div>
            <div className={styles.info}>
                Developer : SeNaJooNa<br />
                Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: senajoona@gmail.com<br />
                Github &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: https://github.com/dsc-sookmyung/2021-SeNaJooNa-OurPlace <br />
                Copyright © OurPlace. All Rights Reserved.
            </div>
        </div>
    )
}

export default Footer
