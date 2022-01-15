import s from './Modal-approve.module.scss'
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import * as actions from 'redux/contacts/phonebook-actions';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ userIdDel, onClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const deleteContact = () => {
    dispatch(actions.dellContacts(userIdDel));
    onClose();
  };
  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <button type="button" className={s.Button} onClick={onClose}>
          Close
        </button>
        <div className={s.Warper}>
          <button type="button" className={s.ButtonActions}  onClick={deleteContact}>delete</button>
          <button type="button" className={s.ButtonActions}  onClick={onClose}>cancel</button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Modal