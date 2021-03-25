import React, {useState, useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import styles from './PlaceCard.module.css';
import axios from 'axios';

function PlaceForm(props) {
    const [name, setName] = useState(props.place.name)
    const [description, setDescription] = useState(props.place.description)
    const [address, setAddress] = useState(props.place.address)

    function changeNameHandler(e){
        setName(e.target.value)
    }
    function changeDescHandler(e){
        setDescription(e.target.value)
    }
    function changeAddressHandler(e){
        setAddress(e.target.value)
    }

    function submitHandler(){
        axios.put(`/api/place/${props.place._id}`, {name:name, description:description, address:address}).then((response) => {
            props.submitForm(response.data.place)
            props.closeModal()
        })
    }

    function cancelHandler(){
        setName(props.place.name)
        setDescription(props.place.description)
        setAddress(props.place.address)
        props.closeModal()
    }

    return (
    <div className={styles.form}>
        <label htmlFor='name'>Place Name</label>
        <input type='text' placeholder='Enter Name' className={styles.input} value={name} onChange={changeNameHandler}></input>

        <label htmlFor='description'>Place Description</label>
        <input type='text' placeholder='Enter Description' className={styles.input} value={description} onChange={changeDescHandler}></input>

        <label htmlFor='address'>Place Address</label>
        <input type='text' placeholder='Enter Address' className={styles.input} value={address} onChange={changeAddressHandler}></input>

        <hr className={styles.hr} />

        <button className={`${styles.modalBtn} ${styles.cancelBtn}`} onClick={cancelHandler}>Cancel</button>
        <button className={`${styles.modalBtn} ${styles.makeBtn}`} onClick={submitHandler}>Ok</button>
    </div>
    )
}

export default withRouter(PlaceForm)