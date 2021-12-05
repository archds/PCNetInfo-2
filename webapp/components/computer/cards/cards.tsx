import { Grid, Typography } from '@material-ui/core'
import { useBuildingsQuery } from 'api/generated/graphql'
import React from 'react'
import Onecard from './card'
import CardAddMore from './cardaddmore'

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
      return <Onecard data={card} key='card.id' />
    })}
    <Grid item xs={3}><CardAddMore /></Grid>
    </Grid>
    
    </>
  }
}


export default Cards