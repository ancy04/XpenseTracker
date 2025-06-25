//import React from 'react';
//styles
import "../Modal/Modal.css"
//components
import Button from '../Button/Button';
import PropTypes from 'prop-types';

const FormButtons = props => {
    //props
    const { text, toggleModal } = props;
    return (
        <div className='formButtons'>
            <Button 
            text={text} 
            background="backgroundOrange" 
            buttonSize="largeButton"
            buttonType="submit"
            />
            <Button 
            text="Cancel" 
            background="backgroundWhite" 
            buttonSize="largeButton"
            clickFunction={toggleModal}
            />
        </div>
    );
};

FormButtons.propTypes = {
  text: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};


export default FormButtons;