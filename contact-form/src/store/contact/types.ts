import { DeepReadonly } from 'vue';

export interface Contact {
  name: string;
  email: string;
  details: string;
  files: string[];
}

export interface ContactState {
  contact: Contact;
}

export interface ContactPost {
  name: string;
  email: string;
  details: string;
  files: File[];
}

export interface ContactStore {
  state: DeepReadonly<ContactState>;
  getContact: () => Contact;
  postContact: (contact: ContactPost) => Promise<Contact>;
}
