import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Row, Spinner, Stack } from 'react-bootstrap';
import Movie from './components/Movie';
import MovieDetail from './components/MovieDetail';
import Cart from './components/Cart';
import { getMoviePrice } from './utils';

function App() {
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [showDetail, setShowDetail] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [showCart, setShowCart] = useState(false)
  
  useEffect(() => {
    axios.get("https://swapi.dev/api/films/").then(res => {
      setMovies(res.data.results.map(data => {
        data.price = getMoviePrice(data.episode_id)
        return data
      }))
      setLoading(false)
    })
  },[])

  const handleMovieDetail = (movie) => {
    setShowDetail(true)
    setSelectedMovie(movie)
  }

  const handleCloseDetail = () => {
    setShowDetail(false)
    setSelectedMovie(null)
  }

  return (
    <>
      <Container className="my-4">
        <Stack direction='horizontal' gap={2} className='mb-4'>
          <h1 className='me-auto'>Movie Collection</h1>
          <Button onClick={() => setShowCart(true)}>Cart</Button>
        </Stack>
        <Row xl={3} lg={2} md={1}>
          {isLoading && (<Spinner />)}
          {!isLoading && movies.map(m => (
            <Col className='mb-4'>
              <Movie key={m.episode_id} movie={m} selectMovie={() => handleMovieDetail(m)}/>
            </Col>
          ))}
        </Row>
      </Container>
      <MovieDetail show={showDetail} handleClose={handleCloseDetail} movie={selectedMovie}/>
      <Cart show={showCart} handleClose={() => setShowCart(false)}/>
    </>
  );
}

export default App;
