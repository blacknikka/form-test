import { ContactRepositoryInterface } from './types';
import { Contact, ContactPostResponse } from '@/store/contact/types';
import axios from "axios";

export class ContactRepository implements ContactRepositoryInterface {
  private readonly ENDPOINT = 'http://localhost:3000';

  private makeUrl(path: string): string {
    return `${this.ENDPOINT}${path}`;
  }

  async postContact(contact: Contact): Promise<ContactPostResponse> {
    const fd = new FormData();
    fd.append("name", contact.name);
    fd.append("email", contact.email);
    fd.append("details", contact.details);

    Array.from(contact.files).forEach((f) => {
      // append each file
      fd.append("files", f, f.name);
    });

    const response = await axios
    .post(this.makeUrl("/dev/contact"), fd, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      return Promise.resolve({
          name: response.data.name,
          email: response.data.email,
          details: response.data.details,
          files: response.data.files,
      } as ContactPostResponse);
    } else {
      const err = response.data.json();
      throw new Error(`APi error: ${err}`);
    }
  }
}
