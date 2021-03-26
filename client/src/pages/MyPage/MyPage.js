import React, { useEffect, useState } from 'react';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import MakeCollectionCard from '../../components/CollectionCard/CollectionEmptyCard';
import PlaceCard from '../../components/PlaceCard/PlaceCard';
import { Link, withRouter } from 'react-router-dom';
import styles from './MyPage.module.css';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/user_action';

function MyPage(props) {

  const [collections, setCollections] = useState([]);
  const [likeCollections, setLikeCollections] = useState([]);
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
    if (user !== "") {
      axios.get(`/api/collections?user=${user}`).then((response) => {
        setCollections(response.data.collection);
      });
    }
  }, [user]);

  useEffect(() => {
    axios.get(`/api/likeCollections/`).then((response) => {
      setLikeCollections(response.data);
    });
  }, []);

  return (
    <div>
      <div className={styles.part1}>
        <div className={styles.text}>Collection I made</div>
        <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
          {collections.map((collection) => (
            <CollectionCard collection={collection} key={collection._id} />
          ))}
          <Link to='/makeCollection/_make'>
            <MakeCollectionCard />
          </Link>
        </div>
      </div>
      <div className={styles.part2}>
        <div className={styles.text}>Collection I like</div>
        <div className={`${styles.gridContainer} ${styles.gridCollection}`}>
          {likeCollections.map((like) => {
            return (
              <CollectionCard
                collection={like.collectionId}
                key={like.collectionId._id}
              />
            );
          })}
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
  );
}

export default withRouter(MyPage);
