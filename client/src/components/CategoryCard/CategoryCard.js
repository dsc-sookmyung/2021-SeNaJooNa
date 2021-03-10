import React from 'react';

import styles from './CategoryCard.module.css';

function CategoryCard() {
    return (
        <div className={styles.categoryCard}>
            <img className={styles.img} src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMTdfMjM0%2FMDAxNjA1NjEyMzgwMjE5.26Qn0cUQ3FQVcDjNQ3KJhm8hzfEWK2CEjCgfUFYPOvQg.zynIqhZZURG9uNatzpHxO5sZhiqQ56DvEUUXLinYyGcg.JPEG.totoroabcd%2Foutput_2867248294.jpg&type=sc960_832" />
            <div className={styles.content}>
                <div className={styles.title}>카테고리 이름</div>
                <div className={styles.detail}>간단 소개글</div>
            </div>
            <div className={styles.imgCover}></div>
        </div>
    )
}

export default CategoryCard
