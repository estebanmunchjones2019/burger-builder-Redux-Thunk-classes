import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div className={classes.Loader}>Loading...</div>
); //the Loading text is just a fallback in case the style for the spinner fails

export default spinner;