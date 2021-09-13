import style from '../styles/mainPage.module.scss'
import {Image} from 'react-bootstrap'

export default function monitors() {
    return (
        <>
            <div className={'wipContainer'}>
                <h1>Work in progress here.</h1>
            </div>
            <div className={'wipContainer'}>
                <p> You need to wait until this guys setting all up.</p>
            </div>
            <div className={'wipContainer'}>
                <Image
                    src="/img/wip_cover.svg"
                />
            </div>
            <style jsx>{`
              .wipContainer {
                display: flex;
                justify-content: center;
                margin-top: 10px;
              }
            `}</style>
        </>
    )
}