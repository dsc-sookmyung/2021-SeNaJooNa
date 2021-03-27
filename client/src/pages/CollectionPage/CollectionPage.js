import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './ThirdPage.module.css';

import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/user_action'
import Favorite from './Favorite';

import PlaceCardsDiv from '../../components/PlaceCard/PlaceCardsDiv'

function CollectionPage(props) {
    const [collection, setCollection] = useState({});
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState("")

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id)
            }
        })
    }, [])
    useEffect(() => {
        axios.get(`/api/collections/${props.location.state.collection._id}`).then((response) => {
            setCollection(response.data.collection)
        })
    }, []);

    const onDeleteHandler = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
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

    return (
        <div className={styles.thirdPage}>
            {/* <div className={styles.left}> */}
            <div>
                <div className={styles.text}>
                    특정 카테고리명 &#8250; {collection.title}
                </div>
                <div>
                    {collection.content}
                </div>
                {(isAuth && user == collection.creator) ?
                    <div>
                        <button onClick={onDeleteHandler} className={styles.like}>삭제</button>
                        <button onClick={onUpdateHandler} className={styles.like}>수정</button>
                    </div> :
                    <Favorite collection={collection} collectionId={collection._id} userId={user}/>
                }
            </div>
            <PlaceCardsDiv isAuth={isAuth} user={user} collection={props.location.state.collection} />
            {/* </div> */}
            {/* <div className={styles.right}>
                지도
            </div> */}
        </div>
    )
}

export default withRouter(CollectionPage)