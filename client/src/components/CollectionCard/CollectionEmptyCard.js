import React from 'react'
import styles from './CollectionCard.module.css';

function CollectionEmptyCard() {
    return (
        <div className={styles.collectionEmptyCard}>
            <div className={styles.emptyText}>+</div>
        </div>
    )
}

export default CollectionEmptyCard

