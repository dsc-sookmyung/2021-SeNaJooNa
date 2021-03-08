import React from 'react';

import styles from './CollectionCard.module.css';

function CollectionCard() {
    return (
        <div className={styles.collectionCard}>
            <img className={styles.img} src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDExMTdfMjM0%2FMDAxNjA1NjEyMzgwMjE5.26Qn0cUQ3FQVcDjNQ3KJhm8hzfEWK2CEjCgfUFYPOvQg.zynIqhZZURG9uNatzpHxO5sZhiqQ56DvEUUXLinYyGcg.JPEG.totoroabcd%2Foutput_2867248294.jpg&type=sc960_832" />
            <div className={styles.content}>
                <div className={styles.title}>컬렉션 이름</div>
                <div className={styles.detail}>간단 소개글</div>
                <button className={styles.like}>🤍좋아요 00</button>
            </div>
            {/* <div className="collection-img-cover"></div> */}
        </div>
    )
}

export default CollectionCard
