import React, { Component } from 'react';
import restaurants from './restaurant.json';
import Resto from '../Resto/Resto';
import ModalWindow from '../ModalWindow/ModalWindow';
import './Restaurant.css';
import { Button } from 'react-bootstrap';

export default class Restaurant extends Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurants: restaurants.restaurants,
      chosenRestaurant: [],
      showBlurhash: true,
      showModal: false
    }
    this.sortByNameAZ = this.sortByNameAZ.bind(this);
    this.sortByNameZA = this.sortByNameZA.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  sortByNameAZ() {
    let restaurants = this.state.restaurants.sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    this.setState(prevState => ({
      restaurants
    }))
  }

  sortByNameZA() {
    let restaurants = this.state.restaurants.sort((a, b) => {
      return a.name < b.name ? 1 : -1
    })
    this.setState(prevState => ({
      restaurants
    }))
  }

  handleClick(restaurant) {
    this.setState(prevState => ({
      chosenRestaurant: restaurant,
      showModal: true
    }))
  }

  handleModal() {
    if (this.state.showModal === true) {
      this.setState(prevState => ({
        showModal: false
      }))
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState(prevState => ({
      showBlurhash: false
    })), 2000);
  }

  render() {

    return (
      <div className='restaurant-container'>
        <h1 className='restaurant-title'>List of 50 restaurants in Helsinki!</h1>
        <div>
          <Button className='restaurant-sort' data-test='button-sort-az' variant='outline-light' onClick={this.sortByNameAZ}>Sort By Name (A-Z)</Button>
          <Button className='restaurant-sort' data-test='button-sort-za' variant='outline-light' onClick={this.sortByNameZA}>Sort By Name (Z-A)</Button>
        </div>
        <Resto restaurants={this.state.restaurants} handleClick={this.handleClick} showBlurhash={this.state.showBlurhash} />
        <ModalWindow showModal={this.state.showModal} chosenRestaurant={this.state.chosenRestaurant} handleModal={this.handleModal} />
      </div>
    )
  }
}
