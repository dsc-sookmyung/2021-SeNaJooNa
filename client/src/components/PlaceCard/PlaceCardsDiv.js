import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router';
import { useDispatch } from 'react-redux'

import styles from './PlaceCard.module.css';
import { auth } from '../../actions/user_action'
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import PlaceEmptyCard from '../../components/PlaceCard/PlaceEmptyCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function PlaceCardsDiv(props){
    const [places, setPlaces] = useState([])
    const [collection, setCollection] = useState(props.collection)
    const [isAuth, setIsAuth] = useState(props.isAuth)
    const [user, setUser] = useState(props.user)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(auth()).then(response => {
            if(props.isLiked){
                axios.get(`/api/like/place`).then((response) => {
                    setPlaces(response.data);
                });
            }
            else if (response.payload.isAuth) {
                setIsAuth(true)
                setUser(response.payload._id)
                axios.get(`/api/places/auth/${collection._id}`).then((response)=>{
                    setPlaces(response.data)
                    console.log("[response]",response.data)
                })
            } else {
                axios.get(`/api/places/${collection._id}`).then((response)=>{
                    setPlaces(response.data)
                    console.log("[response]",response.data)
                })
            }
        })
    }, [])

    function deletePlace(creator, placeId, collectionId){
        if(user === creator){
            axios.delete(`/api/places/creator/${placeId}/${collectionId}`).then((response)=>{
                setPlaces(places.filter(place => place.placeId._id !== response.data.place._id))
            })
        } else {
            axios.delete(`/api/places/${placeId}/${collectionId}`).then((response)=>{
                setPlaces(places.filter(place => place._id !== response.data.place._id))
            })
        }
    }

    return (
        <div className={props.isLiked? `${styles.gridContainer} ${styles.gridPlace}` :`${styles.gridContainer}`}>
            {places.map((place) => (
                <div className={styles.cardContainer} key={place.placeId._id}>
                    {(isAuth && collection && collection.creator===user)?
                    <FontAwesomeIcon 
                        icon={faTimesCircle} color="gray" size="lg" 
                        className={styles.deleteIcon}
                        onClick={()=>{deletePlace(place.placeId.creator,place.placeId._id,collection._id)}}/>:undefined}
                <PlaceCard collection={collection?collection._id:undefined} place={place.placeId} key={place.placeId._id} isLiked={props.isLiked || place.placeId.isLiked} />
                </div>
            ))}
            {isAuth && collection && collection.creator===user?<a href={`/makePlace?collection=${props.location.state.collection._id}`}><PlaceEmptyCard /></a>: undefined}
        </div>
    )
}

export default withRouter(PlaceCardsDiv)