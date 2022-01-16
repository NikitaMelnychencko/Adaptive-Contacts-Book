import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'redux/contacts/phonebook-actions';
import { filterContacts, getFilter } from 'redux/contacts/phonebook-selectors';
import Section from 'components/Section/Section';
import Search from 'components/Search/Search';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import Modal from 'components/Modal/Modal-approve';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { nanoid } from 'nanoid';
import s from './Home.module.scss';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [userIdDel, setUserIdDel] = useState(null);
  const contacts = useSelector(filterContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const formSubmitHandler = data => {
    let isUniqueName = contacts.find(elem => elem.firstName.includes(data.firstName));

    if (!isUniqueName) {
      const userId = { id: nanoid() };
      dispatch(actions.addContacts([...contacts, { ...userId, ...data }]));
    } else {
      const myAlert = alert({
        title: 'Alert',
        text: `${isUniqueName.firstName} is already in contacts`,
      });
    }
  };
  const handleChange = e => {
    const { value } = e.currentTarget;
    dispatch(actions.addFilter(value));
  };

  const toggleModal = contactId => {
    setShowModal(!showModal);
    if (contactId) setUserIdDel(contactId);
  };

  const deleteContact = () => {
    dispatch(actions.dellContacts(userIdDel));
    toggleModal();
  };
  return (
    <>
      <Section title={'Phonebook'}>
        <Search onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={handleChange} />
        <Contacts contacts={contacts} deleteContact={toggleModal} />
      </Section>
      {showModal && (
        <Modal  onClose={toggleModal}>
          <>
            <button
              type="button"
              className={s.DeleteBtn}
              onClick={deleteContact}
              aria-label='Delete'
            >
              Delete
            </button>
            <button
              type="button"
              className={s.CancelBtn}
              onClick={toggleModal}
              aria-label='Cancel'
            >
              Cancel
            </button>
          </>
        </Modal>
      )}
    </>
  );
};
export default Home;
