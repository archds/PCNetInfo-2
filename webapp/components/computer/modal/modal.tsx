import { createStyles, Dialog, DialogContent, DialogTitle, Divider, Grid, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import { useLocationsQuery } from 'api/generated/graphql';
import IconButton from '@material-ui/core/IconButton';
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, InputAdornment, TextField } from '@mui/material';
import style from 'components/computer/modal/modal.module.scss'

export function Modal({active, setActive, name}) {

    if ( name !== 'add') {
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
                        <Grid item xs={6} lg={4}>
                            <Paper className={style.dialogcontent} elevation={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={7}>
                                        <TextField
                                            id="standard-size-small"
                                            defaultValue={location.floor}
                                            variant="standard"
                                            size="small"
                                            sx={{ m: 1, width: '6ch' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Floor</InputAdornment>,
                                              }}
                                            />
                                            <TextField
                                            id="standard-size-small"
                                            defaultValue={location.cabinet}
                                            variant="standard"
                                            size="small"
                                            sx={{ m: 1, width: '8ch' }}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Cabinet</InputAdornment>,
                                              }}
                                            />
                                    <Divider
                                        component="hr" />
                                            <TextField
                                                id="outlined-filled-flexable"
                                                label="Описание"
                                                multiline
                                                sx={{ m: 1 }}
                                                rows={4}
                                                defaultValue={location.description} />
                                    </Grid>
                                    <Grid item xs={12} lg={5}>
                                        computers
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    )
                }))}
                <Grid item xs={6} lg={4} className={style.Addicon}>
                    <IconButton aria-label="add" >
                        <AddCircleIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            </DialogContent>
            </Dialog>
            )
        }
    } else {
        return (<Dialog
            open={active}
            onClose={() => setActive(false)}
        ><DialogTitle><Typography gutterBottom variant="h5">Добавить здание</Typography></DialogTitle>
        <DialogContent className={style.ModalAdd}>
            <Box
            component="form">
                <TextField id="standard-basic" label="Street" variant="standard" margin="dense" /> <br />
                <TextField id="standard-basic" label="house" variant="standard" />
            </Box>
        </DialogContent>
        </Dialog>)
    }
}
