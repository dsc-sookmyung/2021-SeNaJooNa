import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import styles from './PlaceCard.module.css';

function PlaceCard(props) {
    const [image, setImage] = useState("")
    useEffect(() => {
        if(props.place.thumbnail.length === 0){
            setImage("https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTAyMDVfMTky%2FMDAxNjEyNDg3MDQxMDcy.i8O1gb8ZJVuDDl_XEB4Yn_XOj6lPUWuwNPOkhoeRNqkg.2tYCmC3zkx0Qfn4YNQ1pKhtnqcfbQzz_nNXMrbNYyuwg.JPEG.rlawnstjs43%2FIMG_2463.jpg&type=sc960_832")
        } else {
            setImage(props.place.thumbnail[0])
        }
    }, [])
    return (
        <Link to={{
            pathname: '/fourth',
            state: {
                place: props.place
            }
        }}>
            <div className={styles.placeCard}>
                <span className={styles.like}>🤍 {props.place.like_count}</span>
                <div className={styles.imgContainer}>
                    <img className={styles.img} src={image} />
                </div>
                <div className={styles.title}>{props.place.name}</div>
                <div className={styles.detail}>{props.place.description}</div>
            </div>
        </Link>
    )
}

export default PlaceCard
