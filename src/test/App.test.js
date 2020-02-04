import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from '../App';
import Restaurant from '../components/Restaurant/Restaurant';


Enzyme.configure({
  adapter: new EnzymeAdapter
})

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
}

test('renders without error', () => {
  const wrapper = shallow(<App />);
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

// Restaurant Component Tests
test('restaurant state is loaded properly', () => {
  const wrapper = shallow(<Restaurant />);
  const defaultRestaurantState = wrapper.state('restaurants');
  expect(defaultRestaurantState.length).toEqual(50);
});

test('default chosenRestaurant state is an empty array', () => {
  const wrapper = shallow(<Restaurant />);
  const defaultChosenRestaurantState = wrapper.state('chosenRestaurant');
  expect(defaultChosenRestaurantState).toEqual([]);
});

test('sort alphabetically(a-z) button works when clicked', () => {
  const wrapper = shallow(<Restaurant />);
  const restaurantState = wrapper.state('restaurants');
  const button = findByTestAttr(wrapper, 'button-sort-az');
  button.simulate('click');
  expect(restaurantState[0].name).toBe('Arnolds Forum');
  expect(restaurantState[49].name).toBe('Zhonghua');
});

test('sort reversed-alphabetic(z-a) button works when clicked', () => {
  const wrapper = shallow(<Restaurant />);
  const restaurantState = wrapper.state('restaurants');
  const button = findByTestAttr(wrapper, 'button-sort-za');
  button.simulate('click');
  expect(restaurantState[0].name).toBe('Zhonghua')
  expect(restaurantState[49].name).toBe('Arnolds Forum');
});

test('should update the chosen restaurant state when handleClick function is called', () => {
  const restaurant = { name: 'Jobi' }
  const wrapper = shallow(<Restaurant />);
  wrapper.find('Resto').prop('handleClick')(restaurant);
  expect(wrapper.state('chosenRestaurant')).toEqual({
    name: 'Jobi'
  });
});

test('should update showModal state when handleModal function is called', () => {
  const wrapper = shallow(<Restaurant />);
  wrapper.find('ModalWindow').prop('handleModal')();
  expect(wrapper.state('showModal')).toBe(false);
});