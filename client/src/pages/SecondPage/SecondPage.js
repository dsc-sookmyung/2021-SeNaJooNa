import React from 'react'

import styles from './SecondPage.module.css';

import CollectionCard from '../../components/CollectionCard/CollectionCard';

function SecondPage() {
    return (
        <div>
            <div className={styles.part1}>
                <div className={styles.text}>당신이 선택한 카테고리에는 이런 컬렉션들이 존재합니다. </div>
                <div className={`${styles.gridContainer} ${styles.grid4x2}`}>
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                </div>
                <div className={styles.previousNext}>
                    <a href='#' className={styles.button}>&#8249;</a>
                    <a href='#' className={styles.button}>&#8250;</a>
                </div>
            </div>
            <div className={styles.part2}>
                <div className={styles.text}>다른 카테고리가 궁금하신가요?</div>
                <div className={styles.text}>이런 카테고리도 존재합니다. </div>
                <div className={`${styles.gridContainer} ${styles.grid4x1}`}>
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                </div>
                <div className={styles.text}>이런 카테고리도 존재합니다. </div>
                <div className={`${styles.gridContainer} ${styles.grid4x1}`}>
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                </div>
            </div>
        </div>
    )
}

export default SecondPage
