import React, { useState } from 'react'
import { Modal } from 'components/computer/modal/modal'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import Image from 'next/image'
import building from 'C:/Users/Dan/PCNetInfo-2/webapp/public/img/buildings/building.png'
import hotel from 'C:/Users/Dan/PCNetInfo-2/webapp/public/img/buildings/hotel.png'
import skyscraper from 'C:/Users/Dan/PCNetInfo-2/webapp/public/img/buildings/skyscraper.png'
import style from '/components/computer/cards/card.module.scss'
import skyscraperadd from 'C:/Users/Dan/PCNetInfo-2/webapp/public/img/buildings/skyscraperadd.png'

const buildings = [building, hotel, skyscraper]

  
export default function Onecard({ data }) {
  const [modalActive, setModalActive] = useState(false)

    if (data) {
    return (
      <Grid item xs={6} md={4} lg={3}>
          <Card >
          <CardActionArea className={style.Butthurt} onClick={() => setModalActive(!modalActive)}>
              <Image
                src={buildings[data.random]}
                alt="Picture of the author" />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {data.street }, {data.house}
                </Typography>
              </CardContent>
          </CardActionArea>
          </Card>
          <Modal active={modalActive} setActive={setModalActive} name={data} />
      </Grid>
    );
  } else {
    return(
    <Grid item xs={6} md={4} lg={3}>
      <Card >
        <CardActionArea className={style.Butthurt} onClick={() => setModalActive(!modalActive)}>
          <Image
            src={skyscraperadd}
            alt="Picture of the author" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Добавить
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal active={modalActive} setActive={setModalActive} name={'add'} />
    </Grid>
    )
  }
}