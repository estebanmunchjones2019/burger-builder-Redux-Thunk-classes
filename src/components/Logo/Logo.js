import React from 'react';
import { withRouter } from 'react-router-dom';

import burgerLogo from '../../assets/images/burger-logo.png'; //burgerLogo is just a string that 
//contains the path to the optimized image by webpack (the destination is only in memory during development)
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} onClick={() => props.history.push('/')}>
        <img src={burgerLogo} alt="MyBurger"/>
    </div>
);

export default withRouter(logo);