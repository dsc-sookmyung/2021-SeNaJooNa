import React, { useState, useEffect } from 'react'
import axios from 'axios'

import styles from './ThirdPage.module.css';

import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { withRouter } from 'react-router';
import { useSelector } from 'react-redux';

function CollectionPage(props) {
    const user = useSelector(state => state.user);

    const [places, setPlaces] = useState([])
    const [collection, setCollection] = useState({});

    useEffect(() => {
        axios.get(`/api/places/${props.location.state.collection._id}`).then((response) => {
            setPlaces(response.data)
            console.log(response.data)
        })
    }, []);

    useEffect(() => {
        axios.get(`/api/collections/${props.location.state.collection._id}`).then((response) => {
            setCollection(response.data.collection)
            console.log(response.data.collection);
        })
    }, [])

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
                {(user.userData._id == collection.creator) ?
                    <div>
                        <button onClick={onDeleteHandler} className={styles.like}>삭제</button>
                        <button onClick={onUpdateHandler} className={styles.like}>수정</button>
                    </div> :
                    <button className={styles.like}>❤ Collection Like</button>
                }
            </div>
            <div className={styles.gridContainer}>
                {places.map((place) => (
                    <PlaceCard collection={props.location.state.collection._id} place={place.placeId} key={place.placeId._id} />
                ))}

            </div>
            {/* </div> */}
            {/* <div className={styles.right}>
                지도
            </div> */}
        </div>
    )
}

export default withRouter(CollectionPage)
