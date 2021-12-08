
import { Typography, Grid } from '@mui/material'
import { useBuildingsQuery } from 'api/generated/graphql'
import Onecard from './card'
import CardAddMore from './cardaddmore'
import React from 'react'

function Cards() {
  
  const { loading, error, data: buildings } =useBuildingsQuery()
  
  if (loading) {
    return <Typography>Loading...</Typography>
  } else if (error) {
    return <>{error}</>
  } else {
    return <>
    <Grid container spacing={5}>
      {buildings.buildings.map(card => {
        const random = Math.floor(Math.random() * 3)
        const Modicard = {...card, random: `${random}`}
      return <Onecard data={Modicard} />
    })}
      <Onecard data={null}/>
    </Grid>
    
    </>
  }
}


export default Cards
