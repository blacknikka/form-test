import { reactive, readonly, InjectionKey } from 'vue';
import {
  Contact,
  ContactState,
  ContactStore,
  ContactPost,
} from './types';

import Repository from '@/repositories/repositoryFactory';

const state = reactive<ContactState>({
  contact: {
    name: '',
    email: '',
    details: '',
    files: [],
  },
});

const getContact = (): Contact => {
  return state.contact;
};

const postContact = async (contact: ContactPost): Promise<Contact> => {
  const result = await Repository.contact().postContact(contact);

  // set store
  state.contact.name = result.name;
  state.contact.email = result.email;
  state.contact.details = result.details;
  state.contact.files = result.files;
  return result;
};

const contactStore: ContactStore = {
  state: readonly(state),
  getContact,
  postContact,
};

export default contactStore;

export const contactKey: InjectionKey<ContactStore> = Symbol('contact');
