import React, { useState, useEffect } from 'react'
import axios from 'axios'
import queryString from 'query-string'

import styles from './SearchPage.module.css';

import PlaceCard from '../../components/PlaceCard/PlaceCard';
import CollectionCard from '../../components/CollectionCard/CollectionCard';
import { withRouter } from 'react-router';

function SearchPage(props) {
    const [cards, setCards] = useState([])
    const params = queryString.parse(props.location.search);

    useEffect(() => {
        if (params.type === "collection") {
            console.log(params)
            axios.get(`/api/collections?search=${params.query}`)
                .then((response) => {
                    setCards(response.data.collection)
                })
        }
        else {
            axios.get(`/api/place?search=${params.query}`)
                .then((response) => {
                    setCards(response.data.place)
                })
        }
    }, [])

    function addCards(card) {
        if (params.type === "collection") {
            return <CollectionCard collection={card} key={card._id} />
        } else {
            return <PlaceCard collection={undefined} place={card} key={card._id} />
        }
    }

    return (
        <div className={styles.gridContainer}>
            {cards.map((card) => (
                addCards(card)
            ))}
        </div>
    )
}

export default withRouter(SearchPage)