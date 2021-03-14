import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CollectionCard.module.css';

function CollectionCard(props) {
    return (
        <Link to={{
            pathname: '/third',
            state: {
                collection: props.collection
            }
        }}>
        <div className={styles.collectionCard}>
            <img className={styles.img} src={props.collection.thumbnail}/>
            <div className={styles.content}>
                <div className={styles.title}>{props.collection.title}</div>
                <div className={styles.detail}>{props.collection.content}</div>
                <button className={styles.like}>🤍좋아요 {props.collection.like}</button>
            </div>
            {/* <div className="collection-img-cover"></div> */}
            
        </div>
        </Link>
    )
}

export default CollectionCard
