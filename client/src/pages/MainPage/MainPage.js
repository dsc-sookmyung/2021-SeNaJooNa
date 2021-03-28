import React, { useState, useEffect } from 'react';
import axios from 'axios'

import styles from './MainPage.module.css';

import CategoryCard from '../../components/CategoryCard/CategoryCard';
import CollectionEmptyCard from '../../components/CollectionCard/CollectionEmptyCard';
import PlaceEmptyCard from '../../components/PlaceCard/PlaceEmptyCard';

function MainPage() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/category').then((response) => {
            setCategories(response.data)
        })
    }, []);

    cardCount = categories.length;
    cardLimit = cardCount * -1 + 3;

    return (
        <div>
            <div className={`${styles.mainPage} ${styles.part1}`}>
                <div className={styles.text}>요즘 핫한 그곳! 카테고리별로 살펴볼까요?</div>

                <div className={styles.slideBox}>
                    <span className={styles.slideClick} onClick={moveLeft}>&#8249;</span>

                    <div className={styles.cardBox}>
                        <div id='translatedCards' className={styles.categoryCards}>
                            {categories.map((category) => (
                                <CategoryCard category={category} key={category._id} categories={categories} />
                            ))}
                        </div>
                    </div>

                    <span className={styles.slideClick} onClick={moveRight}>&#8250;</span>
                </div>
            </div>
            <div className={`${styles.mainPage} ${styles.part2} ${styles.part}`}>
                <div>
                    <div className={styles.textBig}>나만의 컬렉션 만들기</div>
                    <div className={styles.textSmall}>원하는 장소의 북마크를 눌러 나만의 컬렉션을 만들어보세요</div>
                </div>
                <div>
                    <CollectionEmptyCard />
                </div>
            </div>
            <div className={`${styles.mainPage} ${styles.part3} ${styles.part}`}>
                <div className={styles.textBig}>
                    ❤️ 좋아요
                </div>
                <div>
                    <div className={styles.textBig}>컬렉션 저장하기</div>
                    <div className={styles.textSmall}>다시 보고 싶은 컬렉션의 좋아요를 눌러 컬렉션을 저장하세요</div>
                </div>
            </div>
            <div className={`${styles.mainPage} ${styles.part4} ${styles.part}`}>
                <div>
                    <div className={styles.textBig}>플레이스 만들기</div>
                    <div className={styles.textSmall}>검색했는데 장소가 없다면 직접 만들어보세요</div>
                </div>
                <div>
                    <PlaceEmptyCard />
                </div>
            </div>
        </div >
    )
}

let cardNum = 0;
let cardCount;
let cardLimit;

function moveLeft() {
    cardNum += 1;
    if (cardNum > 0)
        cardNum = 0;
    moveCard()
}

function moveRight() {
    cardNum -= 1;
    if (cardNum < cardLimit)
        cardNum = cardLimit;
    moveCard();
}

function moveCard() {
    let t = cardNum * 300;
    let str = 'translate(' + t + 'px)';
    document.getElementById('translatedCards').style.transform = str;
}

export default MainPage
