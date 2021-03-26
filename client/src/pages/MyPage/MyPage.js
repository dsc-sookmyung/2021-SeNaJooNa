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
  const user = useSelector((state) => state.user);
  const [collections, setCollections] = useState([]);
  const [likeCollections, setLikeCollections] = useState([]);
  const [userId, setUserId] = useState('');
  const [cs, setC] = useState([]);
  const dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(auth()).then((response) => {
      if (response.payload.isAuth) {
        setUserId(response.payload._id);
      }
    });
  }, []);

  useEffect(() => {
    axios.get(`/api/collections?user=true`).then((response) => {
      setCollections(response.data.collection);
    });
  }, []);

  useEffect(async () => {
    console.log(userId);
    await axios.get(`/api/likeCollections/`).then((response) => {
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
