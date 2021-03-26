import axios from "axios";
import { useEffect, useState } from "react";
import styles from './ThirdPage.module.css';

function Favorite(props) {

    const collectionId = props.collectionId;
    const userId = props.userId;

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        axios.get(`/api/likeCollections/${userId}/${collectionId}`).then((response) => {
            console.log(response.data);
            setIsLiked(response.data.like)
            console.log("isliked");
            console.log(isLiked);
        })
    })

    const collectionLikeHandler = () => {
        const doc = {
            "userId": userId,
            "collectionId": collectionId
        }

        if (isLiked) {
            console.log(doc);
            axios.delete('/api/likeCollections', { data: doc }).then((response) => {
                console.log(response);
                setIsLiked(false);
                console.log(isLiked);
            })
        }
        else {
            axios.post('/api/likeCollections', doc).then((response) => {
                console.log(response);
                setIsLiked(true);
                console.log(isLiked);
            })
        }
    }

    return (
        <div>
            <button onClick={collectionLikeHandler} className={styles.like}>{isLiked ? "❤" : "♡"} Collection Like </button>
        </div>
    )
}

export default Favorite