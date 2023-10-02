import React from 'react';
import { Button, Card, Image, Stack } from 'react-bootstrap';

import { currencyFormatter, getMovieImage } from '../utils'

export default function Movie({ movie, selectMovie }) {  
  return (
    <Card data-testid='movie-component'>
      <Card.Body>
        <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
          <div className='me-2'>{movie?.title}</div>
          <div className='text-muted fs-6'>{currencyFormatter.format(movie?.price)}</div>
        </Card.Title>
        <Stack direction='horizontal' gap={3}>
          <Stack direction='vertical' >
            <div className='text-muted fs-6' >Description: </div>
            <div className='movie-description'>{movie?.opening_crawl}</div>
          </Stack>
          <Stack direction='vertical' gap={2} >
            <Image src={getMovieImage(movie?.episode_id)} width={150} className='ms-auto'/>
            <Button size='sm' variant='outline-primary' className='ms-auto' style={{width:'150px'}} onClick={selectMovie}>Details</Button>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  )
}
