import React from 'react';

import styles from './CollectionCard.module.css';

function CollectionCard(props) {
    return (
        <div className={styles.collectionCard}>
            <img className={styles.img} src={props.collection.thumbnail}/>
            <div className={styles.content}>
                <div className={styles.title}>{props.collection.title}</div>
                <div className={styles.detail}>{props.collection.content}</div>
                <button className={styles.like}>🤍좋아요 {props.collection.like}</button>
            </div>
            {/* <div className="collection-img-cover"></div> */}
        </div>
    )
}

export default CollectionCard
