import { Badge, IconButton, Paper, Grid, Divider, Box } from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { LocationsDocument, useDeleteLocationMutation, useUpdateLocationMutation } from 'api/generated/graphql';
import { EditText, EditTextarea } from 'react-edit-text';
import style from 'components/location/location.module.scss'


export default function Locatio({locationData}) {
    const [editLocation] = useUpdateLocationMutation({
        refetchQueries:[LocationsDocument]})
    const [deleteLocation]=useDeleteLocationMutation({variables:{id: locationData.id}, 
        refetchQueries:[LocationsDocument]})

    const [show, setShow]=useState(true)
    return (
        <Box sx={{height:'95%'}} onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>
            <Badge invisible={show} sx={{marginTop:'10px', width:'99%', height:'100%'}} badgeContent={
                    <><IconButton onClick={()=>{deleteLocation()}}><DeleteIcon /></IconButton></>}>
                <Paper sx={{width:'100%'}} elevation={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={7}>

                            <EditText className={style.cabinet}
                                defaultValue={locationData.cabinet}
                                onSave={({value})=>{editLocation({ variables: {id: locationData.id, input: 
                                    {
                                        buildingId: locationData.buildingId, 
                                        cabinet: value, 
                                        floor: locationData.floor, 
                                        description: locationData.descrtiption
                                    }
                                }})}}
                            />

                            <EditText className={style.floor}
                                defaultValue={locationData.floor}
                            />
                            <Divider
                            component="hr" />
                            <EditTextarea className={style.description}
                                rows={4}
                                defaultValue={locationData.description} 
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