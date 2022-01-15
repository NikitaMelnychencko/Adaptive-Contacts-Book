import s from './ContactDetailsPage.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';


const ContactDetailsPageItem = ({ name, value,  updateValue }) => {
  const [inpValue, setInpValue] = useState(value);
  const [disabled, setDisabled] = useState(true);

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
        setDisabled(!disabled);
        setInpValue(value);
        break;
      default:
        return;
    }

    //e.target.previousElementSibling.disabled=!e.target.previousElementSibling.disabled
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    setInpValue(value);
  };
  return (
    <div>
      <input
        name={name}
        value={inpValue}
        data-set={value}
        disabled={disabled}
        onChange={handleChange}
      />
      <button type="button" onClick={changeInput}>
        {disabled === true ? 'Change' : 'Apply'}
      </button>
      <button type="button" onClick={changeInput}>
        {disabled === true ? 'Delete' : 'Cancel'}
      </button>
    </div>
  );
};
export default ContactDetailsPageItem;
