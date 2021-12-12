import { Dialog, DialogContent, DialogTitle, Grid, Paper, Typography, Badge, IconButton} from '@material-ui/core';
import { BuildingsDocument, LocationsDocument, useLocationsQuery, useUpdateBuildingMutation, useCreateLocationMutation } from 'api/generated/graphql';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
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
        const [floor, setFloor] = useState('')
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
            <DialogTitle>
                <Box className={style.title} sx={{display:'flex', flexDirection:'row'}}>
                    <EditText onSave={({ value }) => editBuilding({variables: { id: name.id, input: { street: value, house:name.house } }})} defaultValue={name.street}/>
                    <Typography>,&nbsp;</Typography>
                    <EditText onSave={({ value }) => editBuilding({variables: { id: name.id, input: { street: name.street, house:value } }})} defaultValue={name.house}/>
                </Box>
            </DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
                {locations.buildingLocations.map((location => {
                    return (
                        <Grid item xs={6} lg={4}>
                            <Locatio locationinfo={location}/>
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
                        <Box sx={{height:'100%', width:'100%'}} onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>
                            <Badge invisible={show} sx={{ height:'100%'}}  badgeContent={
                            <><IconButton onClick={()=>{setShowAddPanel(!showAddPanel)}}><CloseIcon/></IconButton></>}>
                        <Paper sx={{width:'100%', height:'105%'}} elevation={12}>
                <Box sx={{p:1, width:'100%', display:'flex', justifyContent:'center', flexDirection:'column'}} component="form" >
                  <TextField id="standard-basic" label="cabinet" variant="standard" margin="dense" onChange={(event) => setCabinet(event.target.value)} /> <br />
                  <TextField id="standard-basic" label="floor" variant="standard" onChange={(event) => setFloor(event.target.value)} />
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
