import React, {useState, useEffect} from 'react';
import axios from 'axios'

import styles from './MainPage.module.css';

import CategoryCard from '../../components/CategoryCard/CategoryCard';

function MainPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/category').then((response)=>{
            setCategories(response.data)
        })
    }, []);

    return (
        <div>
            <div className={`${styles.mainPage} ${styles.part1}`}>
                <div className={styles.text}>요즘 핫한 그곳! 카테고리별로 살펴볼까요?</div>
                <div className={styles.cards}>
                    {categories.map((category)=>(
                        <CategoryCard category={category} key={category._id} categories={categories} />
                    ))}
                    {/* <CategoryCard />
                    <CategoryCard />
                    <CategoryCard />
                    <CategoryCard /> */}
                </div>
            </div>
            <div className={`${styles.mainPage} ${styles.part2} ${styles.textAndImage}`}>
                <div>
                    <div className={styles.textBig}>나만의 컬렉션 만들기</div>
                    <div className={styles.textSmall}>장소를 검색해서 북마크/즐겨찾기를 눌러 나만의 컬렉션을 만들어보세요</div>
                </div>
                <div>
                    {/* two images */}
                    <img src='../../../logo192.png' alt="logo" />
                    <img src='../../../logo192.png' alt="logo" />
                </div>
            </div>
            <div className={`${styles.mainPage} ${styles.part3} ${styles.textAndImage}`}>
                <div>
                    {/* two images */}
                    <img src='../../../logo192.png' alt="logo" />
                    <img src='../../../logo192.png' alt="logo" />
                </div>

                <div>
                    <div className={styles.textBig}>댓글 남기기</div>
                    <div className={styles.textSmall}>장소에 대한 댓글을 남겨보세요</div>
                </div>
            </div>
        </div >
    )
}

export default MainPage
