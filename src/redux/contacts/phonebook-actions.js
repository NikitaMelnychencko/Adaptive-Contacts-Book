import { createAction } from '@reduxjs/toolkit';

export const addContacts = createAction('contacts/addItem');
export const updateContacts = createAction('contacts/updateContacts');
export const dellContacts = createAction('contacts/dellContacts');
export const addFilter = createAction('contacts/addFilter');
