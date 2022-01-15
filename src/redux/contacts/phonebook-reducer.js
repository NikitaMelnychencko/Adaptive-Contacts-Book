import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  addContacts,
  updateContacts,
  addFilter,
  dellContacts,
} from './phonebook-actions';

const itemReducer = createReducer([], {
  [addContacts]: (state, action) => action.payload,
  [updateContacts]: (state, { payload }) => {
    const updatedContacts = [];
    state.forEach(el => {
      el.id !== payload.id
        ? updatedContacts.push(el)
        : updatedContacts.push(payload);
    });
    return updatedContacts;
  },

  [dellContacts]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});
const filterReducer = createReducer('', {
  [addFilter]: (state, action) => action.payload,
});
export default combineReducers({
  items: itemReducer,
  filter: filterReducer,
});
