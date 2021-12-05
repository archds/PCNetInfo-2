import { createStyles, Dialog, DialogContent, DialogTitle, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { useLocationsQuery } from 'api/generated/graphql';
import IconButton from '@material-ui/core/IconButton';
import React from 'react'
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    contentPaper: {
        padding: 20,
        minWidth:150,
        maxWidth: 'auto',
    },
    description:{
        padding:10
    },
    circleadd:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
    }
  })
);

export function Modal({active, setActive, name}) {

    const classes = useStyles();

    const { loading, error, data: locations} = useLocationsQuery({variables:{id: name.id}})

    if (loading) {
        return <Typography>Loading...</Typography>
    } else if (error) {
        return <>{error}</>
    } else {
        return (<Dialog
        fullWidth={true}
        maxWidth={'lg'}
        open={active}
        onClose={() => setActive(false)}
    >
        <DialogTitle><Typography gutterBottom variant="h4">{name.street}, {name.house}</Typography></DialogTitle>
        <DialogContent>
        <Grid container spacing={2}>
            {locations.buildingLocations.map((location => {
                return (
                    <Grid item xs={6} lg={4} >
                        <Paper className={ classes.contentPaper }>
                        <Typography
                            display="block"
                            variant="caption">
                            Этаж {location.floor} / Кабинет {location.cabinet}
                        </Typography>
                        <Divider
                            component="hr" 
                            variant="inset"/>
                        <Typography
                            color="textSecondary"
                            display="block"
                            variant="caption">
                            Описание
                        </Typography>
                        <Typography 
                            className={classes.description}
                        >
                            {location.description}
                        </Typography>
                        </Paper>
                    </Grid>
                )
            }))}
            <Grid item xs={6} lg={4} className={classes.circleadd}>
                <IconButton aria-label="add" >
                    <AddCircleSharpIcon fontSize="large" />
                </IconButton>
            </Grid>
        </Grid>
        </DialogContent>
        </Dialog>
        )
    }
}
