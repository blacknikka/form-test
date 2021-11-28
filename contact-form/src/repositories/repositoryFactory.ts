import { ContactRepositoryInterface } from '@/repositories/contactRepository/types';
import { ContactRepository } from '@/repositories/contactRepository/api';

export class Repositories {
  private contactRepository: ContactRepositoryInterface;

  constructor(contact: ContactRepositoryInterface) {
    this.contactRepository = contact;
  }

  contact(): ContactRepositoryInterface {
    return this.contactRepository;
  }
}

const repositories = new Repositories(new ContactRepository());
export default repositories;
