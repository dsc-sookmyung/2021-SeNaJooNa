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
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />

                </div>
            </div>
            <div className={styles.part2}>
                <div className={styles.text}>Collection I like</div>
                <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
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
                <form className={styles.modalContent}>
                    <h3>새 컬렉션 만들기</h3>

                    <label for='title'>Collection Title</label>
                    <input type='text' id='title' placeholder='Enter Title'></input>
                    <br />
                    <label for='content'>Collection Content</label>
                    <input type='text' id='content' placeholder='Enter Content'></input>
                    <br />
                    <input type='radio' name='publicPrivate' id='public' value='public' checked></input>
                    <label for='public'>공개</label>

                    <input type='radio' name='publicPrivate' id='private' value='private'></input>
                    <label for='private'>비공개</label>
                    <br />

                    <button>썸네일 가져오기</button>
                    <br />

                    <label for='color'>색상 선택하기</label>
                    <input type='color' id='color'></input>

                    <br />
                    <select>
                        <option>카테고리 선택</option>
                        <option>여행</option>
                        <option>맛집</option>
                        <option>관광</option>
                        <option>휴식</option>
                    </select>

                    <br />
                    <button>Cancel</button>
                    <button onClick={closeModal}>Ok</button>
                </form>
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

var modal = document.getElementById('newCollectionModal');
window.addEventListener('click', (event) => { if (event.target == modal) { modal.style.display = 'none'; } })

// var modal = document.getElementById('newCollectionModal');

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

export default MyPage
