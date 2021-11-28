import { Contact, ContactPostResponse } from '@/store/contact/types';

export interface ContactRepositoryInterface {
  postContact(contact: Contact): Promise<ContactPostResponse>;
}

