import {Image} from "react-bootstrap";

export default function Footer() {
    return (
        <>
            <footer>
                <div className={'footer-container'}>
                    <div className={'footer-content'}>
                        <h1>PC Net <span>Info</span></h1>
                        <div className="databases">
                            <a target="_blank" href="https://www.techpowerup.com/cpu-specs/" rel="noreferrer">CPU
                                Database</a>
                            <a target="_blank" href="https://www.techpowerup.com/gpu-specs/" rel="noreferrer">GPU
                                Database</a>
                        </div>
                        <div className="tech-logos">
                            <a target="_blank" className="tech-logo" href="https://www.djangoproject.com/">
                                <Image
                                    src={'/img/techs/django.png'}
                                    width={120}
                                    height={41}
                                />
                            </a>
                            <a target="_blank" className="tech-logo" href="https://ariadnegraphql.org/">
                                <Image
                                    src={'/img/techs/ariadne.png'}
                                    width={150}
                                    height={38}
                                />
                            </a>
                            <a target="_blank" className="tech-logo" href="https://graphql.org/">
                                <Image
                                    src={'/img/techs/graphql.png'}
                                    width={140}
                                    height={40}
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
              .footer-container {
                padding-top: 20px;
                display: flex;
                align-items: center;
                flex-flow: column wrap;
                position: relative;
                width: 70%;
              }

              .footer-content {
                display: grid;
                grid-template-columns: 3fr 2fr 7fr;
                width: 100%;
              }

              .databases {
                display: flex;
                flex-flow: column wrap;
              }
              .tech-logos {
                display: flex;
                gap: 20px;
                justify-self: end;
              }
            `}</style>
        </>
    )
}