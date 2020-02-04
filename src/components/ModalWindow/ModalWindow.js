import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
import './ModalWindow.css';
import Map from '../Map/Map';

const ModalWindow = ({ chosenRestaurant, showModal, handleModal, modalHide }) => {
  if (!chosenRestaurant.location) return null;

  const restaurant = chosenRestaurant;
  const location = chosenRestaurant.location;
  const restaurantTags = chosenRestaurant.tags ?
    restaurant.tags.map((tag) => {
      return (
        `#${tag} `
      );
    }) : '';

  return (
    <div>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header>{restaurant.name}</Modal.Header>
        <Modal.Body>
          <div className='modal-container'>
            <Row>
              <p>{restaurant.description}</p>
            </Row>
            <Row>
              <Map restaurant={restaurant} latitude={location[1]} longitude={location[0]} />
            </Row>
            <Row className='row3'>
              <h5>Tags</h5></Row>
            <Row><p className='modal-tag'>{restaurantTags}</p></Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { handleModal() }}
            variant='outline-danger'>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalWindow