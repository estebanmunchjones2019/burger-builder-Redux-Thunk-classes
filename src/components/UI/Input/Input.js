import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses= [classes.InputElement];
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType) {
        case ('input') :
            inputElement = <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value} onChange={props.changed} onBlur={props.blured}/>;
            break;
        case ('textarea') :
            inputElement = (
                <textarea 
                    className={inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} onChange={props.changed} onBlur={props.blured}/>
            );
            break;
        case ('select') :
            inputElement = (
                <select 
                    className={inputClasses.join(' ')} 
                    type={props.elementConfig.type}

                    value={props.value} onChange={props.changed} onBlur={props.blured}>
                        {props.elementConfig.options.map((option) => {
                            return <option key={option.value} value={option.value}>{option.displayValue}</option>
                        })}
                </select>
            );
                break;    
            default :
                inputElement = (
                    <input 
                        className={inputClasses.join(' ')} 
                        {...props.elementConfig} 
                        value={props.value} onChange={props.changed} onBlur={props.blured}/>
                );
            
    }
    
    let validationError = null;
   
    if (props.invalid && props.touched) {
        // debugger;
validationError = <p className={classes.ValidationError}>{props.validationError}</p>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;