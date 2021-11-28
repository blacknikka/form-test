import { Contact, ContactPost } from '@/store/contact/types';

export interface ContactRepositoryInterface {
  postContact(contact: ContactPost): Promise<Contact>;
}

