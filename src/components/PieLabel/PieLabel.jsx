//import React from 'react';
//styles
import "./PieLabel.css";
import PropTypes from "prop-types";

const PieLabel = props => {
    //props
    const { name, color } = props;
    return (
        <div className='pieLabel'>
            <span className='labelColorBar' style={{backgroundColor: color}}></span>
            <span className='labelText'>{name}</span>
        </div>
    );
};

PieLabel.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default PieLabel;