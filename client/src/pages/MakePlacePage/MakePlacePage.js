import React from 'react'
import { withRouter } from 'react-router-dom';
import styles from './MakePlacePage.module.css'
import PlaceForm from '../../components/PlaceCard/PlaceForm'

function MakePlacePage(props) {
    return (
        <div className={styles.container}>
            <div className={styles.makePlacePage}>
                <PlaceForm 
                    edit={false}
                    place={{name:"", description:"", address:"", thumbnail:""}}
                    closeModal={()=>{props.history.goBack(1)}} 
                    submitForm={()=>{props.history.goBack(1)}} 
                />
            </div>
        </div>
    )
}

export default withRouter(MakePlacePage)
