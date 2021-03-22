import React, { useEffect, useState } from 'react'
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { Link, withRouter } from 'react-router-dom';
import styles from './MyPage.module.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MyPage(props) {
    const user = useSelector(state => state.user)
    const [collections, setCollections] = useState([])

    useEffect(() => {
        axios.get(`/api/collections?user=true`).then((response => {
            setCollections(response.data.collection)
        })
        )
    }, []);

    return (
        <div>
            <div className={styles.part1}>
                <div className={styles.text}>Collection I made</div>
                <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
                    {collections.map((collection) => (
                        <CollectionCard collection={collection} key={collection._id} />
                    ))}

                    <a href="/makeCollection/_make">
                        <div className={styles.imgContainer}>
                            +
                            </div>
                        <div className={styles.content}>
                            추가하기
                            </div>
                    </a>

                    {/* <CollectionCard />
                    <CollectionCard />
                    <CollectionCard /> */}

                </div>
            </div>
            <div className={styles.part2}>
                <div className={styles.text}>Collection I like</div>
                <div className={`${styles.gridContainer} ${styles.gridCollection}`}>

                    {/* <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard />
                    <CollectionCard /> */}
                </div>
            </div>
            <div className={styles.part3}>
                <div className={styles.text}>Place I like</div>
                <div className={`${styles.gridContainer} ${styles.gridPlace}`}>
                    {/* <PlaceCard />
                    <PlaceCard /><PlaceCard /><PlaceCard /><PlaceCard /><PlaceCard /> */}
                </div>
            </div>
        </div>
    )
}

// function openModal() {
//     document.getElementById('newCollectionModal').style.display = 'block';
// }

// function closeModal() {
//     document.getElementById('newCollectionModal').style.display = 'none';
// }

// window.onclick = function (event) {
//     if (event.target == document.getElementById('newCollectionModal')) {
//         closeModal()
//         // document.getElementById('newCollectionModal').style.display = 'none';
//     }
// };

// window.onload = function () {
//     document.getElementById('close').onclick = function () {
//         closeModal()
//         // document.getElementById('newCollectionModal').style.display = 'none';
//     }
// };

export default withRouter(MyPage);
