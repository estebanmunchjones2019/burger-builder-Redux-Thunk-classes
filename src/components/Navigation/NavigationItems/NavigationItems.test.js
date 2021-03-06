//TESTING FUNCTIONAL COMPONENTS---------------------------
import React from 'react'; // to convert JSX to html via React.createElement
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationsItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItem /> elements if not authenticated', () => {
       expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuth: true});
       expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render a Logout <NavigationItem /> element if authenticated', () => {
        wrapper.setProps({isAuth: true});
       expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
})