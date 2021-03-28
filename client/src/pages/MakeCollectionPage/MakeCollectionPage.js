import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import styles from './MakeCollectionPage.module.css'

function MakeCollectionPage(props) {

    const user = useSelector(state => state.user)

    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState(undefined)
    const [color, setColor] = useState("");
    const [id, setId] = useState(props.match.params.id);
    const [collections, setCollection] = useState({});
    const [privateCollection, setPrivateCollection] = useState(false);

    useEffect(() => {
        axios.get('/api/category').then((response) => {
            setCategories(response.data)
        })
    }, []);

    useEffect(() => {
        if (id !== '_make') {
            axios.get(`/api/collections/${id}`).then((response) => {
                setTitle(response.data.collection.title);
                setContent(response.data.collection.content);
                setCategory(response.data.collection.categoryId);
                setPrivateCollection(response.data.collection.private);
            })
        }
    }, [])

    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const onCategoryHandler = (event) => {
        setCategory(event.currentTarget.value);
    }

    const onImageHandler = (event) => {
        setImage(event.currentTarget.files[0]);
    }

    const onColorHandler = (event) => {
        setColor(event.target.value);
    }

    const onPublicPrivateHandler = (event) => {
        if (event.target.value === 'private') {
            setPrivateCollection(true);
        }
        else {
            setPrivateCollection(false);
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('로그인 하세요')
        }

        const formData = new FormData();
        formData.append('title', title)
        formData.append('content', content)
        formData.append('categoryId', category)
        formData.append('creator', user.userData._id)
        formData.append('private', privateCollection)

        if (id === "_make") {
            formData.append('file', image);
        }
        else {
            if (image !== undefined) {
                formData.append('file', image);
            }
        }

        for (var key of formData.keys()) {
            console.log(key);
        }

        for (var value of formData.values()) {
            console.log(value);
        }


        if (id === "_make") {
            axios.post('/api/collections', formData)
                .then(response => {
                    if (response.data.success) {
                        alert('콜렉션 업로드 완료');
                        props.history.push('/myPage')
                    } else {
                        alert('실패');
                    }
                })
        }
        else {
            axios.put(`/api/collections/${id}`, formData)
                .then(response => {
                    if (response.data.success) {
                        alert("수정 완료");
                        props.history.push('/myPage')
                    } else {
                        alert("실패");
                    }
                })
        }

    }

    return (
        <div className={styles.container}>
            <div className={styles.makeCollectionPage}>
                <div className={styles.formBox}>
                    {(id === '_make') ?
                        <h2>새 컬렉션 만들기</h2> :
                        <h2>컬렉션 수정하기</h2>
                    }

                    <hr className={styles.hr} />

                    <form className={styles.form} onSubmit={onSubmitHandler}>
                        <label for='title'>Collection Title</label>
                        <input type='text' value={title} onChange={onTitleHandler} id='title' placeholder='Enter Title' className={`${styles.input}`}></input>

                        <label for='content'>Collection Content</label>
                        <input type='text' value={content} onChange={onContentHandler} id='content' placeholder='Enter Content' className={`${styles.input}`}></input>

                        <div className={styles.radioDiv}>
                            <text>공개 여부: &nbsp;&nbsp;&nbsp;</text>
                            <input type='radio' onChange={onPublicPrivateHandler} checked={privateCollection === false} name='publicPrivate' id='public' value='public' className={styles.radioInput} />
                            <label for='public' className={styles.radioLabel}>공개</label>

                            <input type='radio' onChange={onPublicPrivateHandler} checked={privateCollection === true} name='publicPrivate' id='private' value='private' className={styles.radioInput} />
                            <label for='private' className={styles.radioLabel}>비공개</label>
                        </div>

                        <div className={styles.selectCategoryDiv}>
                            <label for='selectCategory'>
                                카테고리 종류: &nbsp;&nbsp;&nbsp;
                            </label>
                            <select value={category} onChange={onCategoryHandler} id='selectCategory' className={styles.selectCategory}>
                                <option>카테고리 선택</option>
                                {categories.map((category) => (
                                    <option value={category._id}>{category.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label for='image' className={styles.imageLabel}>
                                Image:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </label>
                            <input name="image" onChange={onImageHandler} className="form-control" type="file" id='image' />
                        </div>

                        <hr className={styles.hr} />

                        <button className={`${styles.button} ${styles.cancelBtn}`}>Cancel</button>
                        {(id === '_make') ?
                            <button type="submit" className={`${styles.button} ${styles.makeBtn}`}>Make</button>

                            : <button type="submit" className={`${styles.button} ${styles.makeBtn}`}>Update</button>

                        }
                    </form>
                </div>
            </div>
        </div>

    )
}

export default withRouter(MakeCollectionPage)
