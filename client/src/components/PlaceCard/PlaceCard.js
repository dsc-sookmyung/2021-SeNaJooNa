import React from 'react'

import styles from './PlaceCard.module.css';

function PlaceCard() {
    return (
        <div className={styles.placeCard}>
            <div className={styles.like}>🤍좋아요</div>
            <div>
                <img className={styles.img} src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMDVfMTky%2FMDAxNjEyNDg3MDQxMDcy.i8O1gb8ZJVuDDl_XEB4Yn_XOj6lPUWuwNPOkhoeRNqkg.2tYCmC3zkx0Qfn4YNQ1pKhtnqcfbQzz_nNXMrbNYyuwg.JPEG.rlawnstjs43%2FIMG_2463.jpg&type=sc960_832" />
            </div>
            <div className={styles.title}>장소 이름</div>
            <div className={styles.detail}>간단 소개글</div>
        </div>
    )
}

export default PlaceCard
