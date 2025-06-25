//import React, { useState } from 'react';
//styles
import "./Modal.css"
//import FormButtons from '../FormButtons/FormButtons';
import ModalForm from './ModalForm';
import PropTypes from "prop-types";

const Modal = props => {
    //props
    const { toggleModal, text, existingData } = props;
    
    return (
        <div className='Modal' onClick={toggleModal}>
            <div className='modalBody' onClick={e => e.stopPropagation()}>
                <div className='modalHead'>{text}</div>
                <ModalForm existingData={existingData} formType={text} toggleModal={toggleModal}/>
            </div>
        </div>
    );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  existingData: PropTypes.object, 
};

export default Modal;