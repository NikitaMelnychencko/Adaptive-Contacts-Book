import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { addContacts, addFilter, dellContacts } from './phonebook-actions';

const itemReducer = createReducer([], {
  [addContacts]: (state, action) => action.payload,
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
