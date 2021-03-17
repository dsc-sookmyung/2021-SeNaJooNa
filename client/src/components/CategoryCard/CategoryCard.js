import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import styles from './CategoryCard.module.css';

function CategoryCard(props) {
    const [recommend, setRecommend] = useState([])
    useEffect(() => {
        const findCategory = (element) => element._id === props.category._id
        const idx = props.categories.findIndex(findCategory)
        const category_length = props.categories.length
        if (category_length > 2) {
            setRecommend([props.categories[idx - 1 < 0 ? category_length - 1 : idx - 1], props.categories[idx + 1 >= category_length ? 0 : idx + 1]])
        } else if (props.categories.length > 1) {
            setRecommend([props.categories[idx + 1 >= category_length ? 0 : idx + 1]])
        }

    }, [])
    return (
        <Link to={{
            pathname: '/collection',
            state: {
                categoryId: props.category._id,
                recommend: recommend
            }
        }}>
            <div className={styles.categoryCard}>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={props.category.thumbnail} alt={props.category.title} />
                </div>
                <div className={styles.content}>
                    <div className={styles.title}>{props.category.title}</div>
                    <div className={styles.detail}>{props.category.description}</div>
                </div>
            </div>
        </Link>
    )
}

export default withRouter(CategoryCard)
