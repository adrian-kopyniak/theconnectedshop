import { faker } from '@faker-js/faker';
 
export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}
 
export async function generateContactFormData(): Promise<ContactFormData> {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }).replace(/[\s()-]/g, ''),
    comment: faker.lorem.sentence(),
  };
}
