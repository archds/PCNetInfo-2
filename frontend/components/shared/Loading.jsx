import style from '/styles/Loading.module.scss'
import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loading() {
    return (
        <div className={style.loadingContainer}>
            <Spinner animation='grow' size='lg'/>
        </div>
    )
}

export default Loading