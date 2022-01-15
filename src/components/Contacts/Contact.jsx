import Modal from 'components/Modal/Modal-approve';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import s from './Contacts.module.scss';

const Contact = ({ name, number, id, deleteContact }) => {
  return (
    <li >
      <Link className={s.Contact} to={`/${id}`}>
        <p>
          {name}:{number}
        </p>
        <button onClick={() => deleteContact(id)}>Delete</button>
      </Link>
    </li>
  );
};
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
export default Contact;
