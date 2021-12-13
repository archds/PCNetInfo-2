import { Dialog, DialogContent, DialogTitle, Grid, Paper, Typography, Badge, IconButton} from '@material-ui/core';
import { BuildingsDocument, LocationsDocument, useLocationsQuery, useUpdateBuildingMutation, useCreateLocationMutation } from 'api/generated/graphql';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, styled, TextField } from '@mui/material';
import style from 'components/computer/modal/modal.module.scss';
import { EditText } from 'react-edit-text';
import Locatio from 'components/location/location'

export function Modal({active, setActive, name}) {
        
        const { loading, error, data: locations} = useLocationsQuery({variables:{id: name.id}})

        const [showAddPanel, setShowAddPanel] = useState(true)

        const [editBuilding] = useUpdateBuildingMutation({
            refetchQueries: [BuildingsDocument],
        })
        
        const [cabinet, setCabinet] = useState('')
        const [floor, setFloor]:[number, any] = useState(0)
        const [description, setDescription] = useState('')
        const [show, setShow]=useState(true)

        const [addLocation] =useCreateLocationMutation({
            variables:{input:{buildingId:name.id, cabinet:cabinet, floor:Number(floor), description:description}},
            refetchQueries:[LocationsDocument]
        })
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
            <Box sx={{p:'10px', display:'grid', gridTemplateColumns:'minmax(min-content, 12%) minmax(3%, 5%) 1fr'}}>
                        <EditText className={style.BuildingStreet} onSave={({ value }) => editBuilding({variables: { id: name.id, input: { street: value, house:name.house } }})} defaultValue={name.street}/> 
                        <EditText className={style.BuildingHouse} onSave={({ value }) => editBuilding({variables: { id: name.id, input: { street: name.street, house:value } }})} defaultValue={name.house}/>
            </Box>
            <DialogContent>
            <Grid container spacing={2}>
                {locations.buildingLocations.map((location => {
                    const locationinfo={...location, buildingId:name.id}
                    return (
                        <Grid item xs={6} lg={4}>
                            <Locatio locationData={locationinfo} />
                        </Grid>
                    )
                }))}
                
                    {showAddPanel?
                    <Grid item xs={6} lg={4} className={style.Addicon}>
                        <IconButton aria-label="add" >
                            <AddCircleIcon fontSize="large" onClick={()=>setShowAddPanel(!showAddPanel)}/>
                        </IconButton>
                    </Grid>:
                    <Grid item xs={6} lg={4}> 
                        <Box onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>
                            <Badge invisible={show} className={style.Badge} badgeContent={
                            <><IconButton onClick={()=>{setShowAddPanel(!showAddPanel)}}><CloseIcon/></IconButton></>}>
                                <Paper className={style.Paper} elevation={12}>
                                    <Box sx={{p:1, width:'100%', display:'flex', justifyContent:'center', flexDirection:'column'}} component="form" >
                                        <TextField id="standard-basic" label="cabinet" variant="standard" margin="dense" onChange={(event) => setCabinet(event.target.value)} /> <br />
                                        <TextField type='number' id="standard-basic" label="floor" variant="standard" onChange={(event) => setFloor(event.target.value)} />
                                        <TextField multiline id="standard-basic" label="description" variant="standard" onChange={(event) => setDescription(event.target.value)} />
                                    </Box>
                                    <Button disabled={(floor==''|| cabinet=='' ||description=='')} onClick={addLocation}>Добавить location</Button>
                                </Paper>
                            </Badge>
                        </Box>
                    </Grid>
                    }
            </Grid>
            </DialogContent>
            </Dialog>
            )
        }
}
