import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './Contacts.module.scss';

const Contact = ({ nameFirst, number, id, deleteContact }) => {
  return (
    <li className={s.Contact}>
      <Link  to={`/${id}`}>
        <p>
          {nameFirst}:{number}
        </p>
        
      </Link>
      <button onClick={() => deleteContact(id)}>Delete</button>
    </li>
  );
};
Contact.propTypes = {
  nameFirst: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contact;
