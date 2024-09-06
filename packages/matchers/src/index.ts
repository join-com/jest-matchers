/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as matchers from './matchers'

const jestExpect = global['expect']

if (jestExpect !== undefined) {
  jestExpect.extend(matchers)
} else {
  console.error(`
    Unable to find Jest's global expect.
    Please check you have added jest-matchers to setupFilesAfterEnv section of jest config
  `)
}
