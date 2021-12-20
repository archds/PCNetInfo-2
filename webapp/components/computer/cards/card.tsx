import React, { useState } from 'react'
import { Modal } from 'components/computer/modal/modal'
import { Grid, Typography, Badge, Box, Button, IconButton, TextField, Card, CardContent, CardActionArea, Tooltip } from '@mui/material';
import Image from 'next/image'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import building from 'public/img/buildings/building.png'
import hotel from 'public/img/buildings/hotel.png'
import skyscraper from 'public/img/buildings/skyscraper.png'
import { useCreateBuildingMutation, BuildingsDocument, useDeleteBuildingMutation } from 'api/generated/graphql';

const buildings = [building, hotel, skyscraper]
  
export default function Onecard({ data }) {

  const [modalActive, setModalActive] = useState(false)
  const [state, setState]=useState(true)
  const [street, setStreet]:[string, any] =useState('')
  const [house, setHouse] =useState('')
  const [addBuilding] = useCreateBuildingMutation({
      variables:{input:{street:street, house:house}},
      refetchQueries:[BuildingsDocument]})
  const [show, setShow]=useState(true)
  
    if (data) {
      const [deleteBuilding] = useDeleteBuildingMutation({
      variables:{id: data.id},
    refetchQueries:[BuildingsDocument]
      })
      const deleteButton = 
    <>
      <IconButton onClick={()=>{deleteBuilding()}}>
        <DeleteIcon />
      </IconButton>
    </> 
    return (
      <Grid item xs={6} md={4} lg={3}>
        <Box onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>
        <Badge invisible={show} sx={{width:'100%', height:'100%'}} badgeContent={deleteButton}>
          <Card >
          <CardActionArea sx={{padding:'20px'}} onClick={() => setModalActive(!modalActive)}>
              <Image
                src={buildings[data.random]}
                alt="Picture of the author" 
                height={220}
                width={220}/>
              <CardContent>
                <Typography noWrap gutterBottom variant="h5" component="h2">
                    {data.street }, {data.house}
                </Typography>
              </CardContent>
          </CardActionArea>
          </Card>
          <Modal active={modalActive} setActive={setModalActive} name={data} />
        </Badge>
        </Box>
      </Grid>
    );
  } else {
    return (
    <Grid item xs={6} md={4} lg={3}>
          {state?
          <Card >
            
            <CardActionArea sx={{padding:'20px'}} onClick={()=> setState(!state)}>
              <Box sx={{ display:'flex', justifyContent:'center', alignItems:'center', borderRadius:'10px', backgroundColor:'#41B883', height:'220px', width:'220px'}}>
              <AddIcon sx={{color:'white', height:'100px', width:'100px'}}/>
            </Box>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Add new building
                </Typography>
              </CardContent>

            </CardActionArea>
          </Card>:
          <Box sx={{height:'100%'}} onMouseLeave={()=>{setShow(true)}} onMouseEnter={()=>{setShow(false)}}>

            <Badge invisible={show} sx={{display:'flex',height:'100%'}}  badgeContent={
              <><IconButton onClick={()=>{setState(!state)}}><CloseIcon/></IconButton></>}>
              <Card sx={{p:'20px', width:'fit-content', display:'flex',alignItems:'center', justifyContent:'space-around', flexDirection:'column'}}> 
                <Box sx={{height:'220px', width:'220px', display:'flex', alignItems:'center', justifyContent:'space-around', flexDirection:'column'}}>
                <Typography gutterBottom variant="h5">Добавить здание</Typography>
                <Box component="form" >
                  <TextField id="standard-basic" label="Street" variant="standard" margin="dense" value={street} onChange={(event) => setStreet(event.target.value)} /> <br />
                  <TextField id="standard-basic" label="House" variant="standard" value={house} onChange={(event) => setHouse(event.target.value)} />
                </Box>
                </Box>
                <Button sx={{margin:'18px 0'}} variant='contained' disabled={(house=='' ||street=='')} onClick={()=>{addBuilding()}}>Добавить здание</Button>

              </Card>
            </Badge>

          </Box>}
    </Grid>
    )
  }
}