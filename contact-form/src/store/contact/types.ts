import { DeepReadonly } from 'vue';

export interface Contact {
  name: string;
  email: string;
  details: string;
  files: File[];
}

export interface ContactState {
  contact: Contact;
}

export interface ContactPostResponse {
  name: string;
  email: string;
  details: string;
  files: string[];
}

export interface ContactStore {
  state: DeepReadonly<ContactState>;
  getContact: () => Contact;
  postContact: (contact: Contact) => Promise<ContactPostResponse>;
}
