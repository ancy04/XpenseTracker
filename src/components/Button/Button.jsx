//import React from 'react';
//styles
import "./Button.css"

import PropTypes from "prop-types";

const Button = props => {
    //props
    const { text, background, buttonSize, icon, clickFunction, buttonType } = props;
    return (
        <button 
        className={`Button ${buttonSize} ${background}`}
        onClick={clickFunction}
        type={buttonType}
        >
            {text || <img src={icon} />}
        </button>
    );
};

// ✅ Declare expected prop types
Button.propTypes = {
  text: PropTypes.string,
  background: PropTypes.string,
  buttonSize: PropTypes.string,
  icon: PropTypes.string,
  clickFunction: PropTypes.func,
  buttonType: PropTypes.string,
};

export default Button;