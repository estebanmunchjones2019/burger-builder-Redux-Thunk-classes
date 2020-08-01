import { BurgerBuilder } from './BurgerBuilder';
import React from 'react'; // to convert JSX to html via React.createElement
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder initIngredients={() => {}}/>)
    })

    it('should render <BuildControls /> if ingredients are passed as props', () => {
        wrapper.setProps({ings: true});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
})