import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './SecondPage.module.css';

import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { withRouter } from 'react-router';

function CategoryPage(props) {
    const [collections, setCollections] = useState([])
    const [recommend, setRecommend] = useState([])

    function getRecommend(rec) {
        return new Promise(function (resolve, reject) {
            axios.get(`/api/collections/?categoryId=${rec._id}`).then((response) => {
                resolve({ category: rec.description, collection: response.data.collection.slice(0, 6) })
            })
        })
    }

    useEffect(() => {
        axios.get(`/api/collections/?categoryId=${props.location.state.categoryId}`).then((response) => {
            const collectionList = response.data.collection.filter((collection) => collection.private === false);
            setCollections(collectionList);
        })
        if (props.location.state.recommend) {
            Promise.all(props.location.state.recommend.map(getRecommend)).then((result) => {
                setRecommend(result);
            })
        }
    }, []);

    return (
        <div>
            <div className={styles.part1}>
                <div className={styles.textBig}>당신이 선택한 카테고리에는 이런 컬렉션들이 존재합니다. </div>
                <div className={`${styles.gridContainer} ${styles.grid4x2}`}>
                    {collections.map((collection) => (
                        <CollectionCard collection={collection} key={collection._id} />
                    ))}
                </div>
            </div>
            {
                recommend.map((rec) => (
                    <div className={styles.part2}>
                        <div className={styles.textBig}>다른 카테고리가 궁금하신가요?</div>
                        <div className={styles.textSmall}>{rec.category}</div>
                        <div className={`${styles.gridContainer} ${styles.grid4x1}`}>
                            {rec.collection.map((collection) => (
                                <CollectionCard collection={collection} key={collection._id} />
                            ))}
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default withRouter(CategoryPage)
