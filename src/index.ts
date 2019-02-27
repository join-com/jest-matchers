import * as matchers from './matchers';

// tslint:disable-next-line
const jestExpect = global['expect'];

if (jestExpect !== undefined) {
  jestExpect.extend(matchers);
} else {
  /* tslint:disable:no-console */
  console.error(`
    Unable to find Jest's global expect.
    Please check you have added jest-matchers to setupFilesAfterEnv section of jest config
  `);
  /* tslint:enable:no-console */
}
