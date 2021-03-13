import React, {useState, useEffect} from 'react'
import axios from 'axios'

import styles from './SecondPage.module.css';

import CollectionCard from '../../components/CollectionCard/CollectionCard';

function SecondPage(props) {
    const [collections, setCollections] = useState([])
    const [recommend, setRecommend] = useState([])

    function getRecommend(rec){
        return new Promise(function(resolve, reject){
            axios.get(`/api/collections/category?categoryId=${rec._id}`).then((response)=>{
                resolve({ category:rec.description, collection: response.data.collection.slice(0,6)}) 
            })
        })
    }
    
    useEffect(() => {
        axios.get(`/api/collections/category?categoryId=${props.location.state.categoryId}`).then((response)=>{
            setCollections(response.data.collection)
        })
        Promise.all(props.location.state.recommend.map(getRecommend)).then((result)=>{
            setRecommend(result);
        })
    }, []);
    return (
        <div>
            <div className={styles.part1}>
                <div className={styles.text}>당신이 선택한 카테고리에는 이런 컬렉션들이 존재합니다. </div>
                <div className={`${styles.gridContainer} ${styles.grid4x2}`}>
                    {collections.map((collection)=>(
                        <CollectionCard collection={collection} key={collection._id} />
                    ))}
                </div>
                <div className={styles.previousNext}>
                    <a href='#' className={styles.button}>&#8249;</a>
                    <a href='#' className={styles.button}>&#8250;</a>
                </div>
            </div>
            {
                recommend.map((rec)=>(
                    // rec.collection.length > 0 &&
                    <div className={styles.part2}>
                        <div className={styles.text}>다른 카테고리가 궁금하신가요?</div>
                        <div className={styles.text}>{rec.category}</div>
                        <div className={`${styles.gridContainer} ${styles.grid4x1}`}>
                            {rec.collection.map((collection)=>(
                                <CollectionCard collection={collection} key={collection._id} />
                            ))}
                        </div>
                    </div>
                ))
            }
            
        </div>
    )
}

export default SecondPage
