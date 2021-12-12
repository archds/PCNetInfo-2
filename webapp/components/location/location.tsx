import { Badge, IconButton, Paper, Grid, TextField, InputAdornment, Divider, Box } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { LocationsDocument, useDeleteLocationMutation } from 'api/generated/graphql';

export default function Locatio(locationinfo) {
    const [deleteLocation]=useDeleteLocationMutation({variables:{id: locationinfo.locationinfo.id}, refetchQueries:[LocationsDocument]})
    const [show, setShow]=useState(true)
    return (
        <Box onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>
            <Badge invisible={show} badgeContent={
                    <><IconButton onClick={deleteLocation}><DeleteIcon /></IconButton></>}>
                <Paper sx={{height:'105%'}} elevation={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={7}>
                            <TextField
                                id="standard-size-small"
                                defaultValue={locationinfo.locationinfo.cabinet}
                                variant="standard"
                                size="small"
                                sx={{ m: 1, width: '6ch'}}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Floor</InputAdornment>,
                                }}
                            />
                            <TextField
                                id="standard-size-small"
                                defaultValue={locationinfo.locationinfo.cabinet}
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
                                defaultValue={locationinfo.locationinfo.description} 
                            />
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            computers
                        </Grid>
                    </Grid>
                </Paper>
            </Badge>
        </Box>
    )
}