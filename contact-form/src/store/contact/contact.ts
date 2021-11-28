import { reactive, readonly, InjectionKey } from 'vue';
import {
  Contact,
  ContactState,
  ContactStore,
  ContactPostResponse,
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

const postContact = async (contact: Contact): Promise<ContactPostResponse> => {
  return await Repository.contact().postContact(contact);
};

const contactStore: ContactStore = {
  state: readonly(state),
  getContact,
  postContact,
};

export default contactStore;

export const contactKey: InjectionKey<ContactStore> = Symbol('contact');
