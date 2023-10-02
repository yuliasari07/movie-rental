import React, { useMemo } from 'react';
import { Button, Modal, Stack } from 'react-bootstrap';
import { useMovie } from '../contexts/MovieContext';
import { currencyFormatter } from '../utils';

export default function Cart({show, handleClose}) {
  const { cart, removeMovie } = useMovie()
  const totalRent = useMemo(() => {
    let sum = 0
    cart.forEach(m => sum = sum + m.price)
    return sum
  }, [cart])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Cart
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {cart.length === 0 && (<div className="fs-6">Your cart is empty</div>)}
          {cart.map(movie => (
            <Stack direction="horizontal" gap="2" key={movie.episode_id}>
              <div className="me-auto fs-6">{movie.title}</div>
              <div className="fs-6 fw-bold">
                {currencyFormatter.format(movie.price)}
              </div>
              <Button
                onClick={() => removeMovie(movie)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between align-items-baseline fw-normal mr-3'>
        <div className='me-2'>Total</div>
        <div className='fw-bold fs-6'>{currencyFormatter.format(totalRent)}</div>
      </Modal.Footer>
    </Modal>
  )
}
