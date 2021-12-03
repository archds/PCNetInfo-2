import { Grid, Typography } from '@material-ui/core'
import { useBuildingsQuery } from 'api/generated/graphql'
import React from 'react'
import Onecard from './card'

function Cards() {

  const { loading, error, data: data} =useBuildingsQuery()
  if (loading) {
    return <Typography>Loading...</Typography>
  } else if (error) {
    return <>{error}</>
  } else {
    return <>
    <Grid container spacing={5}>
      {data.buildings.map(card => {
      return <Onecard data={card} key='card.street' />
    })}</Grid>
    
    </>
  }
}


export default Cards