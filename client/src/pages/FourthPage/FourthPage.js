import React from 'react'
import CommentCard from '../../components/CommentCard/CommentCard';
import styles from './FourthPage.module.css';

function FourthPage() {
    return (
        <div className={styles.fourthPage}>
            <div className={styles.left}>
                <div className={styles.text}>
                    category &#8250; collection &#8250; place
                </div>
                <button className={styles.likeButton}>
                    ❤ 000
                </button>
                <div className={styles.content}>
                    <div className={styles.textBig}>
                        Place Name
                </div>
                    <div className={styles.text}>
                        Place Address
                </div>
                    <div className={styles.text}>
                        The number of comments : 00
                </div>
                </div>
                <div>
                    <input type='text' placeholder='댓글 내용'></input>
                    <button type='submit' className={styles.commentBtn}>Leave comment</button>
                </div>
                <div>
                    <CommentCard />
                    <CommentCard />
                    <CommentCard />
                </div>
            </div>
            <div className={styles.right}>
                지도
                <div className={styles.popup} id='fourthPopup'>
                    <h3>장소를 추가할 컬렉션을 선택해주세요</h3>
                    <select>collection list
                        <option>Select collection: </option>
                        <option>My Favorite</option>
                        <option>Let's Eat</option>
                        <option>For trip</option>
                    </select>
                    <button onClick={openForm}>Make new collection</button>
                    <br />
                    <button>Cancel</button>
                    <button type='submit'>Ok</button>
                </div>
                <div className={styles.popupForm} id='fourthPopupForm'>
                    <form action='' className={styles.popupFormContainer}>
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
                        <button onClick={closeForm}>Ok</button>
                    </form>
                </div>
            </div>

        </div>
    )
}

function openForm() {
    document.getElementById('fourthPopupForm').style.display = 'block';
}

function closeForm() {
    document.getElementById('fourthPopupForm').style.display = 'none';
}

export default FourthPage
