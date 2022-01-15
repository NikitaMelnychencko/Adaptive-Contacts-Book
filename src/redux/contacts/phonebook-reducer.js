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
  [updateContacts]: (state, { payload }) =>
    state.map(el => {
      if (el.id !== payload.contactId) return el;
      el[payload.nameType] = payload.upValue;
      return el;
    }),
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
