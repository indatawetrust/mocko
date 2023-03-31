import mocko, { changeLocale } from '../index';

jest.mock('@faker-js/faker/locale/en', () => {
  const originalModule = jest.requireActual('@faker-js/faker/locale/en');

  const { faker } = originalModule;

  return {
    __esModule: true,
    ...originalModule,
    faker: {
      ...faker,
      database: {
        ...faker.database,
        mongodbObjectId: jest.fn(() => 'dea0b50b9d2ec2f671adec5c'),
      },
      internet: {
        ...faker.internet,
        ip: jest.fn(() => '1.1.1.1'),
        password: jest.fn(() => '9OC2Q'),
      },
      finance: {
        ...faker.finance,
        iban: jest.fn(() => 'TR81 0100 3830 0210 0508 5068 03'),
      },
      commerce: {
        ...faker.commerce,
        productName: jest
          .fn()
          .mockReturnValueOnce('Oriental Rubber Sausages')
          .mockReturnValueOnce('Awesome Plastic Pants'),
      },
      phone: {
        ...faker.phone,
        number: jest.fn(() => '555-555-55-55'),
      },
      image: {
        ...faker.image,
        abstract: jest
          .fn()
          .mockReturnValueOnce('https://loremflickr.com/500/500/abstract?lock=81748')
          .mockReturnValueOnce('https://loremflickr.com/500/500/abstract?lock=63746'),
      },
    },
  };
});

jest.mock('@faker-js/faker/locale/tr', () => {
  const originalModule = jest.requireActual('@faker-js/faker/locale/en');

  const { faker } = originalModule;

  return {
    __esModule: true,
    ...originalModule,
    faker: {
      ...faker,
      name: {
        ...faker.name,
        fullName: jest.fn(() => 'Ahmet Şimşek'),
      },
    },
  };
});

describe('test', () => {
  test('#1', () => {
    const result = mocko({
      id: 'database.mongodbObjectId',
      ip: 'internet.ip',
      iban: ['finance.iban', true, 'TR'],
      'tags#2': 'commerce.productName',
      phone: ['phone.number', '5##-###-##-##'],
      password: ['internet.password', 5, false, /[A-Z0-9]/],
      'img#2': ['image.abstract', 500, 500, true],
    });

    expect(result).toStrictEqual({
      id: 'dea0b50b9d2ec2f671adec5c',
      ip: '1.1.1.1',
      iban: 'TR81 0100 3830 0210 0508 5068 03',
      phone: '555-555-55-55',
      password: '9OC2Q',
      tags: ['Oriental Rubber Sausages', 'Awesome Plastic Pants'],
      img: [
        'https://loremflickr.com/500/500/abstract?lock=81748',
        'https://loremflickr.com/500/500/abstract?lock=63746',
      ],
    });
  });

  test('#2', async () => {
    await changeLocale('tr')

    const result = mocko({
      name: 'name.fullName',
    });

    expect(result).toStrictEqual({
      name: 'Ahmet Şimşek'
    });
  });
});
