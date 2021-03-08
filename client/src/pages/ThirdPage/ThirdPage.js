import React from 'react'

import styles from './ThirdPage.module.css';

import PlaceCard from '../../components/PlaceCard/PlaceCard';

function ThirdPage() {
    return (
        <div className={styles.thirdPage}>
            <div className={styles.left}>
                <div>
                    <div className={styles.text}>
                        특정 카테고리명 &#8250; 특정 컬렉션명
                        </div>
                    <button className={styles.like}>❤ Collection Like</button>
                </div>
                <div className={styles.gridContainer}>
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />
                    <PlaceCard />

                </div>
            </div>
            <div className={styles.right}>
                지도
            </div>
        </div>
    )
}

export default ThirdPage
