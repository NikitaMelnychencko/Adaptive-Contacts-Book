import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterContacts,  } from 'redux/contacts/phonebook-selectors';
import {
  useParams
} from 'react-router-dom';
import Section from 'components/Section/Section';
import s from './ContactDetailsPage.module.scss';
import * as actions from 'redux/contacts/phonebook-actions';
import ContactDetailsPageItem from './ContactDetailsPageItem';

const ContactDetailsPage = () => {
  const contacts = useSelector(filterContacts);
  const [newFolder, setNewFolder] = useState(false);
  const [nameFolder, setNameFolder] = useState('');
  const [valueFolder, setValueFolder] = useState('');
  const dispatch = useDispatch();
  const params = useParams();

  const [user] = contacts.filter(el => el.id === params.contactId);
  const key = Object.keys(user);
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
    const updatedContact = { ...user, [nameFolder]: valueFolder };
    dispatch(actions.updateContacts(updatedContact));
    showForm()
  };
  const deleteValue = (nameType) => {
    const updateUser={...user}
    delete updateUser[nameType]
    const updatedContact = { ...updateUser };
    dispatch(actions.updateContacts(updatedContact));
  };
  return (
    <>
      <Section>
        {key.map(
          userKey =>
            userKey !== 'id' && (
              <ContactDetailsPageItem
                name={userKey}
                value={user[userKey]}
                updateValue={updateValue}
                deleteValue={deleteValue}
              />
            ),
        )}
        {newFolder ? (
          <div>
            <form className={s.AddNewFolderBoX} onSubmit={handleSubmit}>
              <label>
                <span>Name Folder</span>
                <input name='name folder' type="text" value={nameFolder}  onChange={handleChange}/>
              </label>
              <label>
                <span>Value</span>
                <input name='value' type="text" value={valueFolder} onChange={handleChange}/>
              </label>
              <button type="submit">Add</button>
            </form>
            <button type="button" onClick={showForm}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={showForm}>
            Add field
          </button>
        )}
      </Section>
    </>
  );
};
export default ContactDetailsPage;
