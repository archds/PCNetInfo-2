import style from 'components/shared/loading/Loading.module.scss'
import { CircularProgress } from '@material-ui/core'
import React from 'react'

function Loading() {
    return (
        <div className={style.loadingContainer}>
            <CircularProgress/>
        </div>
    )
}

export default Loading