import React, { useEffect, useState } from 'react'
import CommentCard from '../../components/CommentCard/CommentCard';
import PlaceForm from '../../components/PlaceCard/PlaceForm';
import styles from './FourthPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

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
    const [newImage, setNewImage] = useState([])
    const [comments, setComments] = useState([])
    const [user, setUser] = useState("")
    const [userName, setUserName] = useState("")
    const [commentInput, setCommentInput] = useState("")
    const [collections, setCollections] = useState([])
    const [collectionValue, setCollectionValue] = useState("")
    const [collection, setCollection] = useState({})
    const params = queryString.parse(props.location.search);

    function getComments() {
        axios.get(`/api/comment/${params.place}`).then((response) => {
            setComments(response.data)
        })
    }

    function OnLikeHandler() {
        if (isAuth) {
            if (!isLiked) {
                axios.post(`/api/like/place`, { placeId: params.place }).then((response) => {
                    setIsLiked(true)
                })
            } else {
                axios.delete(`/api/like/place/${params.place}`).then((response) => {
                    setIsLiked(false)
                })
            }
        } else {
            window.location.href = "/login"
        }
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id)
                setUserName(response.payload.name)
                axios.get(`/api/collections?user=${response.payload._id}`).then((response) => {
                    setCollections(response.data.collection)
                    if (response.data.collection.length > 0) {
                        setCollectionValue(response.data.collection[0]._id)
                    }
                })
                axios.get(`/api/like/place/${params.place}`).then((response) => {
                    if (response.data.like)
                        setIsLiked(true)
                    else
                        setIsLiked(false)
                })
            }
        })
        axios.get(`/api/place/${params.place}`).then((response) => {
            setPlace(response.data.place)
            setImage(response.data.place.thumbnail)
        })
        getComments()
    }, [])

    useEffect(() => {
        if(params.collection !== "undefined")
            axios.get(`/api/collections/${params.collection}`).then((response) => {
                setCollection(response.data.collection)
            })
    }, [])

    function onHandleComment(e) {
        setCommentInput(e.target.value)
    }
    function onSubmitComment() {
        axios.post(`/api/comment`, { placeId: params.place, content: commentInput }).then((response) => {
            setComments([{ ...response.data.comment, userId: { _id: user, name: userName } }, ...comments])
            setCommentInput("")
        })
    }

    function handleCollectionChange(e) {
        setCollectionValue(e.target.value)
    }
    function submitCollection() {
        axios.post(`/api/places`, { placeId: params.place, collectionId: collectionValue }).then((response) => {
            setCollectionValue("")
            closeModal("tempModal")
        })
    }

    function deleteImage(deleteSrc) {
        return new Promise((resolve, reject) => {
            resolve(image.filter(img => img !== deleteSrc))
        })
    }

    function deleteImageHandler(deleteSrc) {
        deleteImage(deleteSrc).then((filtered) => {
            setImage(filtered)
            axios.put(`/api/place/${place._id}`, { existed: filtered }).then((response) => {
                if (response.data.success) {
                    setPlace(response.data.place)
                }
            })
        })
    }

    // New ImageS
    async function onImageHandler(e){
        e.preventDefault();
        var images = []
        for (var i = 0; i < e.target.files.length; i++) {
            images.push(URL.createObjectURL(e.target.files[i]))
        }
        setNewImage(images)
    }
    function uploadImage(e) {
        e.preventDefault();
        const formData = new FormData();
        var len = document.getElementById('image').files.length
        for (var i = 0; i < len; i++) {
            formData.append('file', document.getElementById('image').files[i])
        }
        image.map((img) => { formData.append('thumbnail', img) })
        axios.put(`/api/place/${place._id}`, formData).then((response) => {
            if (response.data.success) {
                setPlace(response.data.place)
                setImage(response.data.place.thumbnail)
                setNewImage([])
                document.getElementById("image").value = "";
            }
        })
    }

    return (
        <div className={styles.fourthPage}>
            <div>
                {params.collection!=="undefined" && <div className={styles.text}>
                    {/* category
                    &#8250; */}
                    <Link to={{
                        pathname: '/collection',
                        state: {
                            collection: collection
                        }
                    }} className={styles.collectionName}>
                        {collection.title}
                    </Link>
                    &nbsp; &#8250; &nbsp;
                     {place.name}
                </div>}
                <button className={styles.addTo} onClick={() => openModal(isAuth, 'tempModal')}>
                    ✔&nbsp;&nbsp;Add to Collection
                </button>
            </div>

            <div className={styles.gridContainer}>
                <div className={styles.left}>
                    <div className={styles.topPhoto}>
                        {
                            image.map((img, idx) =>
                                <div className={idx === 0 ? styles.placePhotoThumb : styles.placePhoto} key={img}>
                                    <div className={styles.placePhotoImage}>
                                        {
                                            (isAuth && place.creator === user) ?
                                                <FontAwesomeIcon
                                                    icon={faTimesCircle} color="gray" size="lg"
                                                    className={styles.deleteIcon}
                                                    onClick={() => deleteImageHandler(img)}
                                                />
                                                : undefined
                                        }
                                        <img src={img} className={styles.img} />
                                    </div>
                                </div>
                            )
                        }
                        {/* Add Image Button */}
                        
                        
                    </div>
                    {
                        (isAuth && place.creator===user) &&
                        <div className={styles.placePhoto}>
                            <input name="image[]" onChange={onImageHandler} className="form-control" type="file" id='image' multiple />
                            <button onClick={uploadImage} className={styles.imageBtn}>Upload</button>
                        </div>
                    }
                    <div className={styles.topPhoto}>
                        {
                            newImage.length > 0 && newImage.map((img)=><img src={img} className={styles.img} key={img} />)

                        }
                    </div>
                    <div className={styles.bottomInfo}>
                        <button className={styles.like} onClick={OnLikeHandler}>
                            {isLiked ? "❤️" : "🤍"}&nbsp;Place Like
                        </button>
                        <div className={styles.textBig}>
                            {place.name}&nbsp;
                            {(isAuth && place.creator === user) ? <FontAwesomeIcon icon={faEdit} onClick={() => { openModal(isAuth, 'editModal') }} /> : undefined}
                        </div>
                        <div>
                            {place.address}
                        </div>
                        <div>
                            {place.description}
                        </div>
                        <div>
                            The number of comments : {comments.length}
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div>
                        <input type='text' placeholder='댓글 내용' className={styles.commentInput} value={commentInput} onChange={onHandleComment} />
                        <button type='submit' className={styles.leaveCommentBtn} onClick={onSubmitComment}>Leave</button>
                    </div>
                    <hr className={styles.rightHr} />
                    <div>
                        {
                            comments.map((comment) => (
                                <CommentCard comment={comment} user={user} key={comment._id}
                                    deleteComment={() => { setComments(comments.filter(com => com._id !== comment._id)) }}
                                    editComment={getComments}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div id='tempModal' className={styles.tempModal}>
                <div className={styles.modalContent}>
                    <span id='close' className={styles.close} onClick={() => { closeModal('tempModal') }}>&times;</span>
                    <h2>Add Place to Collection</h2>
                    <hr className={styles.hr} />
                    <div className={styles.selectCollectionDiv}>
                        <label htmlFor='selectCollection'>Collection list: &nbsp;&nbsp;&nbsp;</label>
                        <select id='selectCollection' className={styles.selectCollection} value={collectionValue} onChange={handleCollectionChange}>
                            {
                                collections.map((collection) => (
                                    <option value={collection._id} key={collection._id}>{collection.title}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.popupGridContainer}>
                        <div>
                            <button onClick={() => { window.location.href = '/makeCollection/_make' }} className={styles.popupBtn}>Make new collection</button>
                        </div>
                    </div>
                    <hr className={styles.hr} />
                    <button className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={() => { closeModal('tempModal') }}>Cancel</button>
                    <button className={`${styles.modalBtn} ${styles.makeBtn}`} onClick={submitCollection}>Ok</button>
                </div>
            </div >
            <div id='editModal' className={styles.tempModal}>
                <div className={styles.modalContent}>
                    <span id='close' className={styles.close} onClick={() => { closeModal('editModal') }}>&times;</span>
                    {
                        place.name && place.description && place.address ?
                            <PlaceForm
                                edit={true}
                                place={place}
                                closeModal={() => { closeModal('editModal') }}
                                submitForm={(editedPlace) => { setPlace(editedPlace) }}
                            /> : undefined
                    }
                </div>
            </div >
        </div >
    )
}

function openModal(isAuth, modal) {
    if (isAuth)
        document.getElementById(modal).style.display = 'block';
    else
        window.location.href = '/login'
}

function closeModal(modal) {
    document.getElementById(modal).style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == document.getElementById('tempModal') || event.target == document.getElementById('editModal')) {
        closeModal('tempModal');
        closeModal('editModal');
    }
};

export default withRouter(PlacePage)

