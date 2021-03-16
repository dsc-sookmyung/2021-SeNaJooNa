import React, {useState, useEffect} from 'react'
import axios from 'axios'

import styles from './ThirdPage.module.css';

import PlaceCard from '../../components/PlaceCard/PlaceCard';

function ThirdPage(props) {
    const [places, setPlaces] = useState([])
    useEffect(() => {
        axios.get(`/api/places/${props.location.state.collection._id}`).then((response)=>{
            setPlaces(response.data)
        })
    }, []);
    return (
        <div className={styles.thirdPage}>
            {/* <div className={styles.left}> */}
            <div>
                <div className={styles.text}>
                    특정 카테고리명 &#8250; 특정 컬렉션명
                        </div>
                <button className={styles.like}>❤ Collection Like</button>
            </div>
            <div className={styles.gridContainer}>
                {places.map((place)=>(
                    <PlaceCard place={place} key={place._id} />
                ))}

            </div>
            {/* </div> */}
            {/* <div className={styles.right}>
                지도
            </div> */}
        </div>
    )
}

export default ThirdPage
