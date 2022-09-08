import styles from './Styles/PicturePopup.moudule.se'
import React from 'react'

function PicturePopup(props){
    return (props.trigger) ? (
        <div className='popup'>
            <div className='popup inner'>
                <button className='close btn'>Close</button>               
            </div>
        </div>
    ):"";

}

export default PicturePopup