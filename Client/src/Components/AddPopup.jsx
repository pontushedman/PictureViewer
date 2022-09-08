import styles from './Styles/AddPopup.module.css';
import React from 'react';

function AddPopup(props){
    return (props.trigger) ? (
        <div className={styles.Popup}>
            <div className={styles.Popupinner}>
                <button className={styles.Close-btn} >Close</button>
                {props.children}
            </div>
        </div>
    ) : "";
}


export default AddPopup;