import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Cheese', type:'cheese'},
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Meat', type:'meat'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>${props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
            return <BuildControl 
            key={control.label} 
            label={control.label} 
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            disabled={props.disabled[control.type]}/>
        })}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'LOGIN TO ORDER'}</button> 
    </div>
);
   

 


export default buildControls;