import PropTypes from 'prop-types';
import Contact from './Contact';

const Contacts = ({ contacts, deleteContact }) => {
  return (
    <ul>
      {contacts.length > 0 &&
        contacts.map(item => (
          <Contact
            key={item.id}
            firstName={item.firstName}
            number={item.number}
            id={item.id}
            deleteContact={deleteContact}
          />
        ))}
    </ul>
  );
};
Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contacts;
