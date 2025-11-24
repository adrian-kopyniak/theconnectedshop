import { faker } from '@faker-js/faker';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  comment: string;
}

export async function generateContactFormData(): Promise<ContactFormData> {
  const { faker } = await import('@faker-js/faker');

  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    //phone: faker.phone.number({ style: 'international' }).replace(/[\s()-]/g, ''),
    phone: faker.number.int({ min: 1000000000, max: 99999999999 }).toString(),
    comment: faker.lorem.sentence(),
  };
}
