import s from './ContactDetailsPage.module.scss';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import Modal from 'components/Modal/Modal-approve';

const ContactDetailsPageItem = ({ name, value,  updateValue, deleteValue}) => {
  const [inpValue, setInpValue] = useState(value);
  const [disabled, setDisabled] = useState(true);
  const [curentOperation, setCurentOperation] = useState('')
  const [showModal, setShowModal] = useState(false);
  const lastStep = useRef(value)
  
  const changeInput = e => {
    const { textContent } = e.target;
    
    switch (textContent) {
      case 'Change':
        setDisabled(!disabled);
        break;
      case 'Apply':
        setDisabled(!disabled);
        updateValue(name, e.target.previousElementSibling.defaultValue)
        break;
      case 'Cancel':
        toggleModal('Cancel')
        break;
      case 'Delete':  
        toggleModal('Cancel')
        break;
      default:
        return;
    }
  };

  const undoAction = () => {
    switch (curentOperation) {
      case 'Cancel':
        setDisabled(!disabled);
        setInpValue(value);
        toggleModal()
        break;
      case 'Delete':
        deleteValue(name)
        break;
      default:
        return;
    }
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setInpValue(value);
  };

  const goToLastStep = e => {
    setInpValue(lastStep.current)
    updateValue(name, lastStep.current)
  };

  const toggleModal = (value) => {
    setShowModal(!showModal);
    setCurentOperation(value)
  };
  
  return (
    <>
    <label className={s.Farm}>
      {name}
      <input
        name={name}
        value={inpValue}
        disabled={disabled}
        onChange={handleChange}
      />
      <button type="button" onClick={changeInput}>
        {disabled === true ? 'Change' : 'Apply'}
      </button>
      <button type="button" onClick={changeInput}>
        {disabled === true ? 'Delete' : 'Cancel'}
      </button>
      <button type='button' onClick={goToLastStep}>B</button>
    </label>
    {showModal && (
        <Modal  onClose={toggleModal}>
          <>
            <button
              type="button"
              className={s.ButtonActions}
              onClick={undoAction}
            >
              Apply
            </button>
            <button
              type="button"
              className={s.ButtonActions}
              onClick={toggleModal}
            >
              cancel
            </button>
          </>
        </Modal>
      )}</>
  );
};
export default ContactDetailsPageItem;
