import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    const sideDrawerClasses = [classes.SideDrawer, classes[props.open ? 'Open' : 'Close']]
    return (
        <React.Fragment>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={sideDrawerClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    )
}

export default sideDrawer;