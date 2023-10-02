import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Modal, Image, Spinner } from 'react-bootstrap';
import { getMovieImage } from '../utils';
import { useMovie } from '../contexts/MovieContext';

export default function MovieDetail({show, handleClose, movie}) {
  const [characters, setCharacters] = useState('')
  const [isCharLoading, setCharLoading] = useState(true)
  const [starships, setStarships] = useState('')
  const [isStarshipLoading, setStarshipLoading] = useState(true)
  const { cart, addMovie } = useMovie()


  useEffect(() => {
    setCharacters('')
    setStarships('')
    setCharLoading(true)
    setStarshipLoading(true)

    let charURLs = []
    movie?.characters.forEach(char => {
      charURLs.push(`${char}`)
    })
    const charRequests = charURLs.map((url) => axios.get(url));
    axios.all(charRequests).then((responses) => {
      responses.forEach((resp) => {
        setCharacters(prevChar => [...prevChar, `${resp.data.name}, `])
        setCharLoading(false)
      })
    })

    let starshipURLs = []
    movie?.starships.forEach(ship => {
      starshipURLs.push(`${ship}`)
    })
    const starshipRequests = starshipURLs.map((url) => axios.get(url));
    axios.all(starshipRequests).then((responses) => {
      responses.forEach((resp) => {
        setStarships(prevShip => [...prevShip, `${resp.data.name}, `])
        setStarshipLoading(false)
      })
    })
  },[movie])

  const checkCart = () => {
    return cart.find(m => m?.episode_id === movie?.episode_id)
  }

  function handleSubmit(movie) {
    addMovie(movie)
    handleClose()
  }
  
  return (
    <Modal id="movie-details-modal" show={show} onHide={handleClose} data-testid='movie-detail-modal'>
      <Modal.Header closeButton>
        <Modal.Title>
          {movie?.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-center mt-3 mb-3'>
        <Image src={getMovieImage(movie?.episode_id)} width={250}/>
        </div>
        <div className='d-flex align-items-baseline'>Release date:
          <span className='ms-1 text-muted'>{movie?.release_date}</span>
        </div>
        <div className='d-flex align-items-baseline' >Director:
          <span className='ms-1 text-muted'>{movie?.director}</span>
        </div>
        <div className='d-flex align-items-baseline' >Producer:
          <span className='ms-1 text-muted'>{movie?.producer}</span>
        </div>
        <div className='d-flex align-items-baseline' >Characters:
          {isCharLoading && (<Spinner animation="grow" size="sm" className='ms-1' />)}
          {!isCharLoading && characters.length > 0 && (<span className='ms-1 text-muted'>{characters}</span>)}
        </div>
        <div className='d-flex align-items-baseline' >Description:
          <span className='ms-1 text-muted'>{movie?.opening_crawl}</span>
        </div>
        <div className='d-flex align-items-baseline' >Starships:
          {isStarshipLoading && (<Spinner animation="grow" size="sm" className='ms-1' />)}
          {!isStarshipLoading && starships.length > 0 && (<span className='ms-1 text-muted'>{starships}</span>)}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button type='submit' disabled={checkCart()} onClick={() => handleSubmit(movie)}>Add to Cart</Button>
      </Modal.Footer>
    </Modal>
  )
}
