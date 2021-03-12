import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CategoryCard.module.css';

function CategoryCard(props) {
    return (
        <div className={styles.categoryCard}>
            <Link to={{
                pathname: '/second',
                state: {
                    categoryId: props.category._id
                }
            }}>
                <img className={styles.img} src={props.category.thumbnail} alt={props.category.title} />
                <div className={styles.content}>
                    <div className={styles.title}>{props.category.title}</div>
                    <div className={styles.detail}>{props.category.description}</div>
                </div>
                <div className={styles.imgCover}></div>
            </Link>
        </div>
    )
}

export default CategoryCard
