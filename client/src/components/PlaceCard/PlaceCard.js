import React, {useState, useEffect} from 'react'
import { Link, withRouter } from 'react-router-dom';
import styles from './PlaceCard.module.css';
import { useDispatch } from 'react-redux'
import { auth } from '../../actions/user_action'
import axios from 'axios';


function PlaceCard(props) {
    const [image, setImage] = useState("")
    const [isAuth, setIsAuth] = useState(false)
    const [like, setLike] = useState(props.place.like_count)
    const [isLiked, setIsLiked] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        if(props.place.thumbnail.length === 0){
            setImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMDVfMTky%2FMDAxNjEyNDg3MDQxMDcy.i8O1gb8ZJVuDDl_XEB4Yn_XOj6lPUWuwNPOkhoeRNqkg.2tYCmC3zkx0Qfn4YNQ1pKhtnqcfbQzz_nNXMrbNYyuwg.JPEG.rlawnstjs43%2FIMG_2463.jpg&type=sc960_832")
        } else {
            setImage(props.place.thumbnail[0])
        }
        dispatch(auth()).then(response => {
            if (response.payload.isAuth) {
                setIsAuth(true)
                axios.get(`/api/like/place/${props.place._id}`).then((response)=>{
                    if(response.data.like)
                        setIsLiked(true)
                    else
                        setIsLiked(false)
                })
            }
        })
    }, [])
    function OnLikeHandler(){
        if(isAuth){
            if(!isLiked){
                axios.post(`/api/like/place`,{placeId:props.place._id}).then((response)=>{
                    setLike(like+1)
                    setIsLiked(true)
                })
            } else {
                axios.delete(`/api/like/place/${props.place._id}`).then((response)=>{
                    setLike(like-1)
                    setIsLiked(false)
                })
            }
        } else {
            window.location.href="/login"
        }
    }
    return (
            <div className={styles.placeCard}>
                <span className={styles.like} onClick={OnLikeHandler}>{isLiked?"❤️":"🤍"} {like}</span>
                {/* <Link to={{
                    pathname: `/fourth?collection=${props.collection}&place=${props.place._id}`,
                    state: {
                        place: props.place
                    }
                }}> */}
                <Link to={`/place?collection=${props.collection}&place=${props.place._id}`}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img} src={image} />
                    </div>
                    <div className={styles.title}>{props.place.name}</div>
                    <div className={styles.detail}>{props.place.description}</div>
                </Link>
            </div>
    )
}

export default withRouter(PlaceCard)
