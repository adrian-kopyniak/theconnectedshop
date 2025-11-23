import { faker } from '@faker-js/faker';

export class ContactFormDataBuilder {
  private data = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number({ style: 'international' }),
    comment: faker.lorem.sentence(),
  };

  withName(name: string) {
    this.data.name = name;
    return this;
  }

  withEmail(email: string) {
    this.data.email = email;
    return this;
  }

  withPhone(phone: string) {
    this.data.phone = phone;
    return this;
  }

  withComment(comment: string) {
    this.data.comment = comment;
    return this;
  }

  build() {
    return this.data;
  }
}
