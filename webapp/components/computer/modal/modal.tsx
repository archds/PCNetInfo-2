import { Dialog, DialogContent, DialogTitle, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { BuildingsDocument, LocationsDocument, useLocationsQuery, useUpdateBuildingMutation, useCreateLocationMutation } from 'api/generated/graphql';
import IconButton from '@material-ui/core/IconButton';
import React, { useState } from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import style from 'components/computer/modal/modal.module.scss';
import { EditText } from 'react-edit-text';



export function Modal({active, setActive, name}) {
        
        const { loading, error, data: locations} = useLocationsQuery({variables:{id: name.id}})

        const [showAddPanel, setShowAddPanel] = useState(true)

        const [editBuilding] = useUpdateBuildingMutation({
            refetchQueries: [BuildingsDocument],
        })
        
        const [cabinet, setCabinet] = useState('')
        const [floor, setFloor] = useState('')
        const [description, setDescription] = useState('')

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
                            <Paper className={style.dialogcontent} elevation={12}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={7}>
                                        <TextField
                                            id="standard-size-small"
                                            defaultValue={location.floor}
                                            variant="standard"
                                            size="small"
                                            sx={{ m: 1, width: '6ch'}}
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
                
                    {showAddPanel?
                    <Grid item xs={6} lg={4} className={style.Addicon}>
                        <IconButton aria-label="add" >
                            <AddCircleIcon fontSize="large" onClick={()=>setShowAddPanel(!showAddPanel)}/>
                        </IconButton>
                    </Grid>:
                    <Grid item xs={6} lg={4} className={style.Addicon}> 
                        <Paper className={style.dialogcontent} elevation={12}>
                <Box component="form" >
                  <TextField id="standard-basic" label="cabinet" variant="standard" margin="dense" onChange={(event) => setCabinet(event.target.value)} /> <br />
                  <TextField id="standard-basic" label="floor" variant="standard" onChange={(event) => setFloor(event.target.value)} />
                  <TextField multiline id="standard-basic" label="description" variant="standard" onChange={(event) => setDescription(event.target.value)} />
                </Box>
                <Button disabled={(floor==''|| cabinet=='' ||description=='')} onClick={addLocation}>Добавить location</Button>
                        </Paper>
                    </Grid>
                    }
                      
            </Grid>
            </DialogContent>
            </Dialog>
            )
        }
}
