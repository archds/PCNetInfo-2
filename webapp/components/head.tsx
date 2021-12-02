import Head from 'next/head'
import React from 'react'

function HeadComponent() {
    return (
        <Head>
            <title>PC Net Info</title>
            <link rel='apple-touch-icon' sizes='180x180' href='/img/favicon/apple-touch-icon.png'/>
            <link rel='icon' type='image/png' sizes='32x32' href='/img/favicon/favicon-32x32.png'/>
            <link rel='icon' type='image/png' sizes='16x16' href='/img/favicon/favicon-16x16.png'/>
            <link rel='manifest' href='/img/favicon/safari-pinned-tab.svg'/>
            <link rel='mask-icon' href='/img/favicon/safari-pinned-tab.svg' color='#41b883'/>
            <link rel='shortcut icon' href='/img/favicon/favicon.ico'/>
            <meta name='msapplication-TileColor' content='#41b883'/>
            <meta name='msapplication-config' content='/img/favicon/browserconfig.xml'/>
            <meta name='theme-color' content='#ffffff'/>
        </Head>
    )
}

export default HeadComponent