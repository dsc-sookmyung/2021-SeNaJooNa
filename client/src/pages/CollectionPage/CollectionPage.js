import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './ThirdPage.module.css';

import PlaceCardsDiv from '../../components/PlaceCard/PlaceCardsDiv'
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/user_action'

function CollectionPage(props) {
    const [places, setPlaces] = useState([])
    const [collection, setCollection] = useState({});
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState("")
    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id)
                axios.get(`/api/likeCollections/${props.location.state.collection._id}`).then((response) => {
                    if (response.data.like)
                        setIsLiked(true)
                    else
                        setIsLiked(false)
                })
            }
        })
        axios.get(`/api/places/${props.location.state.collection._id}`).then((response) => {
            setPlaces(response.data)
        })

        axios.get(`/api/collections/${props.location.state.collection._id}`).then((response) => {
            setCollection(response.data.collection)
        })
    }, [])

    // useEffect(() => {

    // }, []);

    const onDeleteHandler = () => {
        if (places.length !== 0) {
            alert("Place 게시글이 남아있는 경우 삭제가 불가능합니다.");
        }
        else if (window.confirm("정말 삭제하시겠습니까?")) {
            axios.delete(`/api/collections/${props.location.state.collection._id}`).then((response) => {
                if (response.data.success) {
                    props.history.push('/myPage');
                }
            })
        }
    }

    const onUpdateHandler = () => {
        props.history.push(`makeCollection/${props.location.state.collection._id}`)
    }

    const collectionLikeHandler = () => {
        const doc = {
            "collectionId": collection._id
        }
        console.log(doc);
        if (isLiked) {
            axios.delete('/api/likeCollections', { data: doc }).then((response) => {
                setIsLiked(false);
            })
        }
        else {
            console.log("좋아요")
            axios.post('/api/likeCollections', doc).then((response) => {
                setIsLiked(true);
            })
        }
    }


    return (
        <div className={styles.collectionPage}>
            <div>
                <div className={styles.textBig}>
                    특정 카테고리명 &#8250; {collection.title}
                </div>
                <div className={styles.textSmall}>
                    {collection.content}
                </div>
                {(isAuth && user === collection.creator) ?
                    <div>
                        <button onClick={onDeleteHandler} className={styles.like}>삭제</button>
                        <button onClick={onUpdateHandler} className={styles.like}>수정</button>
                    </div> : null

                }
                <div>
                    <button onClick={collectionLikeHandler} className={styles.like}>{isLiked ? "❤" : "♡"} Collection Like </button>
                </div>
            </div>
            <PlaceCardsDiv isAuth={isAuth} user={user} collection={props.location.state.collection} />
        </div>
    )
}

export default withRouter(CollectionPage)
