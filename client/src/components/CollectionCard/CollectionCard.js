import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './CollectionCard.module.css';

function CollectionCard(props) {
    return (
        <Link to={{
            pathname: '/place',
            state: {
                collection: props.collection
            }
        }}>
            <div className={styles.collectionCard}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={props.collection.thumbnail} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{props.collection.title}</div>
                    <div className={styles.detail}>{props.collection.content}</div>
                    <button className={styles.like}>🤍좋아요 {props.collection.like}</button>
                </div>
            </div>
        </Link>
    )
}

export default withRouter(CollectionCard)
