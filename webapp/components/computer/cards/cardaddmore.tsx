import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

const useStyles = makeStyles({
    root: {
        height: "100%",
        width: "available"
    },
    media: {
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems:"center",
        
    }
  });

export default function CardAddMore() {
    const classes = useStyles();
    return (<>
        <Card className={classes.root}>
        <CardActionArea className={classes.media}>+</CardActionArea></Card>
    </>)
}