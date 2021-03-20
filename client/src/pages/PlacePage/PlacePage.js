import React, {useEffect, useState} from 'react'
import CommentCard from '../../components/CommentCard/CommentCard';
import styles from './FourthPage.module.css';
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/user_action'
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string'
import axios from 'axios';

function PlacePage(props) {
    const [isAuth, setIsAuth] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [place, setPlace] = useState({})
    const [image, setImage] = useState([])
    const [comments, setComments] = useState([])
    const [user, setUser] = useState("")
    const [userName, setUserName] = useState("")
    const [commentInput, setCommentInput] = useState("")
    const [collections, setCollections] = useState([])
    const [collectionValue, setCollectionValue] = useState("")
    const params = queryString.parse(props.location.search);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id)
                setUserName(response.payload.name)
                axios.get(`/api/collections?user=${response.payload._id}`).then((response)=>{
                    setCollections(response.data.collection)
                })
            }
        })
        axios.get(`/api/place/${params.place}`).then((response)=>{
            setPlace(response.data.place)
            setImage(response.data.place.thumbnail)
        })
        axios.get(`/api/comment/${params.place}`).then((response)=>{
            setComments(response.data)
        })
        
    }, [])

    function onHandleComment(e){
        setCommentInput(e.target.value)
    }
    function onSubmitComment(){
        axios.post(`/api/comment`, {placeId:params.place, content:commentInput}).then((response)=>{
            setComments([{...response.data.comment, userId:{_id:user, name:userName}}, ...comments])
            setCommentInput("")
        })
    }

    function handleCollectionChange(e){
        setCollectionValue(e.target.value)
    }
    function submitCollection(){
        axios.post(`/api/places`, {placeId:params.place, collectionId:collectionValue}).then((response)=>{
            setCollectionValue("")
            closeModal()
        })
    }

    return (
        <div className={styles.fourthPage}>
            <div>
                <div className={styles.text}>
                    category 
                    &#8250; 
                    collection
                    &#8250; 
                    {place.name}
                </div>
                <button className={styles.like} onClick={() => openModal(isAuth)}>
                    ❤ Place Like
                </button>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.left}>
                    <div className={styles.topPhoto}>
                        {
                            image.map((img)=>
                            <div className={styles.placePhoto} key={img}>
                                <img src={img} className={styles.img} />
                            </div>
                            )
                        }
                        
                    </div>
                    <div className={styles.bottomInfo}>
                        <div className={styles.textBig}>
                            {place.name}
                        </div>
                        <div>
                            {place.address}
                        </div>
                        <div>
                            The number of comments : 00
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div>
                        <input type='text' placeholder='댓글 내용' className={styles.commentInput} value={commentInput} onChange={onHandleComment} />
                        <button type='submit' className={styles.leaveCommentBtn} onClick={onSubmitComment}>Leave comment</button>
                    </div>
                    <hr className={styles.rightHr} />
                    <div>
                        {
                            comments.map((comment)=>(
                                <CommentCard comment={comment} user={user} key={comment._id}/>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div id='tempModal' className={styles.tempModal}>
                <div className={styles.modalContent}>
                    <span id='close' className={styles.close} onClick={closeModal}>&times;</span>
                    <h2>Add Place to Collection</h2>
                    <hr className={styles.hr} />
                    <div className={styles.selectCollectionDiv}>
                        <label htmlFor='selectCollection'>Collection list: &nbsp;&nbsp;&nbsp;</label>
                        <select id='selectCollection' className={styles.selectCollection} value={collectionValue} onChange={handleCollectionChange}>
                            {
                                collections.map((collection)=>(
                                    <option value={collection._id} key={collection._id}>{collection.title}</option>
                                ))
                            }
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
                                        <label htmlFor='title'>Collection Title</label>
                                        <input type='text' id='title' placeholder='Enter Title' className={`${styles.input}`}></input>
                                        <label htmlFor='content'>Collection Content</label>
                                        <input type='text' id='content' placeholder='Enter Content' className={`${styles.input}`}></input>
                                        <div className={styles.radioDiv}>
                                            <label>공개 여부: &nbsp;&nbsp;&nbsp;</label>
                                            <input type='radio' name='publicPrivate' id='public' value='public' className={styles.radioInput} />
                                            <label htmlFor='public' className={styles.radioLabel}>공개</label>
                                            <input type='radio' name='publicPrivate' id='private' value='private' className={styles.radioInput} />
                                            <label htmlFor='private' className={styles.radioLabel}>비공개</label>
                                        </div>
                                    </div>
                                    <div className={styles.formRight}>
                                        <div className={styles.selectCategoryDiv}>
                                            <label htmlFor='selectCategory'>카테고리 종류: &nbsp;&nbsp;&nbsp;</label>
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
                                            <label htmlFor='color'>Select the Collection color: &nbsp;&nbsp;&nbsp;</label>
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
                    <button className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={closeModal}>Cancel</button>
                    <button className={`${styles.modalBtn} ${styles.makeBtn}`} onClick={submitCollection}>Ok</button>
                </div>
            </div >
        </div >
    )
}
function openModal(isAuth) {
    if(isAuth)
        document.getElementById('tempModal').style.display = 'block';
    else
        window.location.href = '/login'
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
export default withRouter(PlacePage)

