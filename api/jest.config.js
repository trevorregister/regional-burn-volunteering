module.exports = {
    // other options...
    setupFilesAfterEnv: ['./src/__tests__/jest.setup.js'],
    testPathIgnorePatterns: [
      './src/__tests__/builder.js', 
      './src/__tests__/jest.setup.js',
      './src/__tests__/integration/supertest.config.js',
    ],
  }