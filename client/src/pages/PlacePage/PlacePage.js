import React from 'react'
import CommentCard from '../../components/CommentCard/CommentCard';
import styles from './FourthPage.module.css';
function PlacePage() {
    return (
        <div className={styles.fourthPage}>
            <div>
                <div className={styles.text}>
                    category &#8250; collection &#8250; place
                </div>
                <button className={styles.like} onClick={openModal}>
                    ❤ Place Like
                </button>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.left}>
                    <div className={styles.topPhoto}>
                        <div class={styles.placePhoto}>
                            <img src='../../../logo192.png' className={styles.img} />
                        </div>
                        <div class={styles.placePhoto}>
                            <img src='../../../logo192.png' className={styles.img} />
                        </div>
                        <div class={styles.placePhoto}>
                            <img src='../../../logo192.png' className={styles.img} />
                        </div>
                    </div>
                    <div className={styles.bottomInfo}>
                        <div className={styles.textBig}>
                            Place Name
                        </div>
                        <div>
                            Place Address
                        </div>
                        <div>
                            The number of comments : 00
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div>
                        <input type='text' placeholder='댓글 내용' className={styles.commentInput} />
                        <button type='submit' className={styles.leaveCommentBtn}>Leave comment</button>
                    </div>
                    <hr className={styles.rightHr} />
                    <div>
                        <CommentCard />
                        <CommentCard />
                        <CommentCard />
                    </div>
                </div>
            </div>
            <div id='tempModal' className={styles.tempModal}>
                <div className={styles.modalContent}>
                    <span id='close' className={styles.close} onClick={closeModal}>&times;</span>
                    <h2>Add Place to Collection</h2>
                    <hr className={styles.hr} />
                    <div className={styles.selectCollectionDiv}>
                        <label for='selectCollection'>Collection list: &nbsp;&nbsp;&nbsp;</label>
                        <select id='selectCollection' className={styles.selectCollection}>
                            <option>Select collection: </option>
                            <option>My Favorite</option>
                            <option>Let's Eat</option>
                            <option>For trip</option>
                        </select>
                    </div>
                    <div className={styles.popupGridContainer}>
                        <div>
                            <button onClick={openForm} className={styles.popupBtn}>Make new collection</button>
                        </div>
                        <div className={styles.popupForm} id='fourthPopupForm'>
                            <div className={styles.popupContent}>
                                <span id='close' className={styles.close} onClick={closeForm}>&times;</span>
                                <h2 className={styles.modalTitle}>새 컬렉션 만들기</h2>
                                <hr className={styles.hr} />
                                <div className={styles.formCenter}>
                                    <div className={styles.formLeft}>
                                        <label for='title'>Collection Title</label>
                                        <input type='text' id='title' placeholder='Enter Title' className={`${styles.input}`}></input>
                                        <label for='content'>Collection Content</label>
                                        <input type='text' id='content' placeholder='Enter Content' className={`${styles.input}`}></input>
                                        <div className={styles.radioDiv}>
                                            <text>공개 여부: &nbsp;&nbsp;&nbsp;</text>
                                            <input type='radio' name='publicPrivate' id='public' value='public' className={styles.radioInput} />
                                            <label for='public' className={styles.radioLabel}>공개</label>
                                            <input type='radio' name='publicPrivate' id='private' value='private' className={styles.radioInput} />
                                            <label for='private' className={styles.radioLabel}>비공개</label>
                                        </div>
                                    </div>
                                    <div className={styles.formRight}>
                                        <div className={styles.selectCategoryDiv}>
                                            <label for='selectCategory'>카테고리 종류: &nbsp;&nbsp;&nbsp;</label>
                                            <select id='selectCategory' className={styles.selectCategory}>
                                                <option>카테고리</option>
                                                <option>여행</option>
                                                <option>맛집</option>
                                                <option>관광</option>
                                                <option>휴식</option>
                                            </select>
                                        </div>
                                        <button className={`${styles.takeThumbnailBtn}`}>썸네일 가져오기</button>
                                        <div className={styles.colorPicker}>
                                            <label for='color'>Select the Collection color: &nbsp;&nbsp;&nbsp;</label>
                                            <input type='color' id='color' />
                                        </div>
                                    </div>
                                </div>
                                <hr className={styles.hr} />
                                <button className={`${styles.modalBtn} ${styles.cancelBtn}`}>Cancel</button>
                                <button className={`${styles.modalBtn} ${styles.makeBtn}`} onClick={closeForm}>Make</button>
                            </div>
                        </div>
                    </div>
                    <hr className={styles.hr} />
                    <button className={`${styles.modalBtn} ${styles.cancelBtn}`}>Cancel</button>
                    <button className={`${styles.modalBtn} ${styles.makeBtn}`} onClick={closeModal}>Ok</button>
                </div>
            </div >
        </div >
    )
}
function openModal() {
    document.getElementById('tempModal').style.display = 'block';
}
function closeModal() {
    document.getElementById('tempModal').style.display = 'none';
}
window.onclick = function (event) {
    if (event.target == document.getElementById('tempModal')) {
        closeModal();
        // closeForm();
    }
};
function openForm() {
    document.getElementById('fourthPopupForm').style.display = 'block';
}
function closeForm() {
    document.getElementById('fourthPopupForm').style.display = 'none';
}
export default PlacePage

