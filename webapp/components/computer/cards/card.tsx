import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import { Modal } from 'components/computer/modal/modal'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function Onecard({ data }) {
  const classes = useStyles();
  const [modalActive, setModalActive] = useState(false)

  return (
    <Grid item xs={3}>
        <Card className={classes.root}>
        <CardActionArea onClick={() => setModalActive(!modalActive)}>
            <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {data.street }, {data.house}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
        <Modal active={modalActive} setActive={setModalActive} locali={modalActive}/>
    </Grid>
  );
}