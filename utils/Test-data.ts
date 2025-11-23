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
    phone: faker.phone.number().replace(/[\s()-]/g, ''),
    comment: faker.lorem.sentence(),
  };
}
