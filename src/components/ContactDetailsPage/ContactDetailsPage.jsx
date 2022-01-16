import { useState,useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts } from 'redux/contacts/phonebook-selectors';
import { useParams } from 'react-router-dom';
import Section from 'components/Section/Section';
import s from './ContactDetailsPage.module.scss';
import * as actions from 'redux/contacts/phonebook-actions';
import ContactDetailsPageItem from './ContactDetailsPageItem';
import Modal from 'components/Modal/Modal-approve';
import { nanoid } from 'nanoid';

const ContactDetailsPage = () => {
  const contacts = useSelector(filterContacts);
  const [newFolder, setNewFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [valueFolder, setValueFolder] = useState('');
  const dispatch = useDispatch();
  const params = useParams();
  
  const [user] = contacts.filter(el => el.id === params.contactId);
  const key = Object.keys(user);
  const lastStep = useRef('');
  
  useEffect(() => {
    lastStep.current=user
  }, [user]);

  const updateValue = (nameType, upValue) => {
    const updatedContact = { ...user, [nameType]: upValue };
    dispatch(actions.updateContacts(updatedContact));
  };
  const showForm = () => {
    setNewFolder(!newFolder);
  };
  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name folder':
        setNameFolder(value);
        break;
      case 'value':
        setValueFolder(value);
        break;
      default:
        return;
    }
  };
  const handleSubmit = () => {
    const updatedContact = { ...user, [nameFolder.toLowerCase()]: valueFolder };
    dispatch(actions.updateContacts(updatedContact));
    showForm();
  };
  const deleteValue = nameType => {
    const updateUser = { ...user };
    delete updateUser[nameType];
    const updatedContact = { ...updateUser };
    dispatch(actions.updateContacts(updatedContact));
  };
  return (
    <>
      <Section title={'Edit contact'}>
        <ul className={s.FormList}>
        {key.map(
          userKey =>
            userKey !== 'id' && (
              <ContactDetailsPageItem
                key={nanoid()}
                name={userKey}
                value={user[userKey]}
                updateValue={updateValue}
                deleteValue={deleteValue}
                lastStep={lastStep.current[userKey]}
              />
            ),
        )}</ul>
        {newFolder ? (
          <Modal onClose={showForm}>
            <div>
              <strong>Enter any value for the new field. Warning:Names-types of fields Email, Number are reserved</strong>
              <form className={s.AddNewFolderBoX} onSubmit={handleSubmit}>
                <label className={s.Item}>
                  <span>Name Folder</span>
                  <input
                    className={s.Input}
                    name="name folder"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
                    value={nameFolder}
                    onChange={handleChange}
                  />
                </label>
                <label className={s.Item}>
                  <span>Value</span>
                  <input
                    className={s.Input}
                    name="value"
                    type="text"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="First Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob , Charles"
                    value={valueFolder}
                    onChange={handleChange}
                  />
                </label>
                <div className={s.AddBtnFieldBox}>
                  <button className={s.ApplyBtn} type="submit" aria-label='Add'>Add</button>
                  <button
                    className={s.CancelBtn}
                    type="button"
                    onClick={showForm}
                    aria-label='Cancel'
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </Modal>
        ) : (
          <button type="button" className={s.AddField} aria-label='Add field' onClick={showForm}>
            Add field
          </button>
        )}
      </Section>
    </>
  );
};
export default ContactDetailsPage;
