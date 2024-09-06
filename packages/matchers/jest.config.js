module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: { '^.+\\.tsx?$': ['ts-jest', { diagnostics: false }] },
  maxWorkers: 1,
  workerIdleMemoryLimit: '1.5GB',
}
