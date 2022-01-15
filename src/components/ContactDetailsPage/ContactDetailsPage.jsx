import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  filterContacts,
  getFilter,
} from 'redux/contacts/phonebook-selectors';
import {
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import Section from 'components/Section/Section';
import s from './ContactDetailsPage.module.scss'
import PropTypes from 'prop-types';
import * as actions from 'redux/contacts/phonebook-actions';
import ContactDetailsPageItem from './ContactDetailsPageItem'

const ContactDetailsPage = () => {
  const contacts = useSelector(filterContacts);
  const dispatch = useDispatch();
  const params = useParams();
  const [user, setUser]= useState(contacts.filter(el => el.id === params.contactId)[0]);
  const key = Object.keys(user)
  
  const updateValue = (nameType, upValue) => {
    const updateContacts = contacts.map(el => {
      if (el.id !== params.contactId) return el;
      el[nameType] = upValue;
      return el
    })
    dispatch(actions.updateContacts([...updateContacts]));
    //dispatch(actions.updateContacts({nameType:nameType,upValue:upValue,contactId:params.contactId}));
  }
  return (
    <>
      <Section>
        {key.map(userKey => (
          userKey!=='id' && (< ContactDetailsPageItem name={userKey} value={user[userKey]} updateValue={updateValue} />)
        ))}
          
      </Section>
    </>
  )
}
export default ContactDetailsPage