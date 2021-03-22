import React from 'react'
import styles from './PlaceCard.module.css';

function PlaceEmptyCard() {
    return (
        <div className={styles.placeEmptyCard}>
            <div className={styles.emptyText}>+</div>
        </div>
    )
}

export default PlaceEmptyCard
