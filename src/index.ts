import { faker as fakerImport } from '@faker-js/faker/locale/en';
import get from 'lodash.get';
import set from 'lodash.set';
import unset from 'lodash.unset';
import noop from 'lodash.noop';

type RandomFunction = () => object;

const getData = (fn: RandomFunction, count: number) => {
  if (isNaN(count)) {
    return fn();
  }

  return Array(count < 0 ? 0 : count)
    .fill(null)
    .map(() => fn());
};

interface SetDataOptions {
  obj: object;
  key: string;
  realKey: string;
  count?: number;
}

const setData = (data: any, { obj, key, realKey, count }: SetDataOptions) => {
  set(obj, realKey, data);

  if (!isNaN(count as any)) {
    unset(obj, key);
  }
};

let faker = fakerImport;

export const changeLocale = (locale: string) => {
  return import(`@faker-js/faker/locale/${locale}`).then(({ faker: fakerImport }) => {
    faker = fakerImport;
  });
};

const mocko = (tempObj: object) => {
  const obj = tempObj;

  for (const [key, value] of Object.entries(obj)) {
    // eslint-disable-next-line prefer-const
    const [realKey, tempCount] = key.split('#');

    const count = parseInt(tempCount, 10);

    const defaultParams = {
      obj,
      key,
      realKey,
      count,
    };

    let randFn;

    switch (typeof value) {
      case 'string':
        randFn = (): any => get(faker, value, noop)();
        break;
      case 'object':
        if (Array.isArray(value)) {
          const [fnName, ...fnParams] = value;

          randFn = (): any => get(faker, fnName, noop)(...fnParams);
        } else {
          randFn = (): any => mocko({ ...value });
        }
        break;
      default:
        randFn = null;
        break;
    }

    if (randFn) {
      const data = getData(randFn, count);

      setData(data, defaultParams);
    } else {
      unset(obj, key);
    }
  }

  return obj;
};

export default mocko;
