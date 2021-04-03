import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom';
import styles from './PlaceCard.module.css';
import axios from 'axios';
import queryString from 'query-string'

function PlaceForm(props) {
    const [name, setName] = useState(props.place.name)
    const [description, setDescription] = useState(props.place.description)
    const [address, setAddress] = useState(props.place.address)
    const query = queryString.parse(props.location.search)

    const [newImage, setNewImage] = useState([])

    function changeNameHandler(e) {
        setName(e.target.value)
    }
    function changeDescHandler(e) {
        setDescription(e.target.value)
    }
    function changeAddressHandler(e) {
        setAddress(e.target.value)
    }

    function submitHandler() {
        axios.put(`/api/place/${props.place._id}`, { name: name, description: description, address: address, thumbnail: props.place.thumbnail }).then((response) => {
            props.submitForm(response.data.place)
            props.closeModal()
        })
    }

    function cancelHandler() {
        setName(props.place.name)
        setDescription(props.place.description)
        setAddress(props.place.address)
        props.closeModal()
    }

    // New Image
    function onImageHandler(e) {
        setNewImage(e.currentTarget.files)
    }
    function submitNewHandler(e) {
        e.preventDefault();
        const formData = new FormData();
        var len = document.getElementById('image').files.length
        for (var i = 0; i < len; i++) {
            formData.append('file', document.getElementById('image').files[i])
        }
        formData.append('name', name)
        formData.append('description', description)
        formData.append('address', address)
        axios.post(`/api/place`, formData).then((response) => {
            if (response.data.success) {
                axios.post(`/api/places`,
                    { placeId: response.data.place._id, collectionId: query.collection }
                ).then((response) => {
                    console.log(response)
                    props.submitForm()
                })
            }
        })
    }

    return (

        <div className={styles.formBox}>
            <h2>{(props.edit) ? "플레이스 수정하기" : "새 플레이스 만들기"}</h2>
            <hr className={styles.hr} />
            <div>
                <label htmlFor='name'>장소 이름</label>
                <input type='text' placeholder='Enter Name' className={styles.input} value={name} onChange={changeNameHandler}></input>

                <label htmlFor='description'>장소 설명</label>
                <input type='text' placeholder='Enter Description' className={styles.input} value={description} onChange={changeDescHandler}></input>

                <label htmlFor='address'>위치</label>
                <input type='text' placeholder='Enter Address' className={styles.input} value={address} onChange={changeAddressHandler}></input>

                {(props.edit) ? undefined :
                    <div>
                        <label for='image' className={styles.imageLabel}>
                            사진 등록
                        </label>
                        <br /> <br />
                        <input name="image[]" onChange={onImageHandler} className="form-control" type="file" id='image' multiple />
                    </div>
                }

                <hr className={styles.hr} />

                <button className={`${styles.button} ${styles.cancelBtn}`} onClick={(props.edit) ? cancelHandler : props.closeModal}>취소</button>
                <button className={`${styles.button} ${styles.makeBtn}`} onClick={(props.edit) ? submitHandler : submitNewHandler}>등록</button>
            </div>
        </div>
    )
}

export default withRouter(PlaceForm)