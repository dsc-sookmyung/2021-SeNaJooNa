import React from 'react'
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';

import styles from './MyPage.module.css';

function MyPage() {
    return (
        <div>
            <button onClick={openModal}>New Collection temp button</button>
            <div className={styles.part1}>
                <div className={styles.text}>Collection I made</div>
                <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
                    {/* <CollectionCard />
                    <CollectionCard />
                    <CollectionCard /> */}

                </div>
            </div>
            <div className={styles.part2}>
                <div className={styles.text}>Collection I like</div>
                <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
                    {/* <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard /> */}
                </div>
            </div>
            <div className={styles.part3}>
                <div className={styles.text}>Place I like</div>
                <div className={`${styles.gridContainer} ${styles.gridPlace}`}>
                    <PlaceCard />
                    <PlaceCard /><PlaceCard /><PlaceCard /><PlaceCard /><PlaceCard />
                </div>
            </div>

            <div id='newCollectionModal' className={styles.modal}>
                <div className={styles.modalContent}>
                    <span id='close' className={styles.close} onClick={closeModal}>&times;</span>
                    <h2 className={styles.modalTitle}>새 컬렉션 만들기</h2>
                    <hr className={styles.hr} />
                    <div className={styles.modalCenter}>
                        <div className={styles.modalLeft}>
                            <label for='title'>Collection Title</label>
                            <input type='text' id='title' placeholder='Enter Title' className={`${styles.input}`}></input>

                            <label for='content'>Collection Content</label>
                            <input type='text' id='content' placeholder='Enter Content' className={`${styles.input}`}></input>

                            <div className={styles.radioDiv}>
                                <text>공개 여부: &nbsp;&nbsp;&nbsp;</text>
                                <input type='radio' name='publicPrivate' id='public' value='public' className={styles.radioInput} />
                                <label for='public' className={styles.radioLabel}>공개</label>

                                <input type='radio' name='publicPrivate' id='private' value='private' className={styles.radioInput} />
                                <label for='private' className={styles.radioLabel}>비공개</label>
                            </div>
                        </div>

                        <div className={styles.modalRight}>
                            <div className={styles.selectCategoryDiv}>
                                <label for='selectCategory'>카테고리 종류: &nbsp;&nbsp;&nbsp;</label>
                                <select id='selectCategory' className={styles.selectCategory}>
                                    <option>카테고리</option>
                                    <option>여행</option>
                                    <option>맛집</option>
                                    <option>관광</option>
                                    <option>휴식</option>
                                </select>
                            </div>

                            <button className={`${styles.takeThumbnailBtn}`}>썸네일 가져오기</button>

                            <div className={styles.colorPicker}>
                                <label for='color'>Select the Collection color: &nbsp;&nbsp;&nbsp;</label>
                                <input type='color' id='color' />
                            </div>
                        </div>
                    </div>
                    <hr className={styles.hr} />

                    <button className={`${styles.modalBtn} ${styles.cancelBtn}`}>Cancel</button>
                    <button className={`${styles.modalBtn} ${styles.makeBtn}`}>Make</button>
                </div>
            </div>
        </div>
    )
}

function openModal() {
    document.getElementById('newCollectionModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('newCollectionModal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('newCollectionModal')) {
        closeModal()
        // document.getElementById('newCollectionModal').style.display = 'none';
    }
};

// window.onload = function () {
//     document.getElementById('close').onclick = function () {
//         closeModal()
//         // document.getElementById('newCollectionModal').style.display = 'none';
//     }
// };

export default MyPage
