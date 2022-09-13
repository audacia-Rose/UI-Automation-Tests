// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 800,
  defaultCommandTimeout: 4000,
  screenshotOnRunFailure: false,
  chromeWebSecurity: false,
  reporter: 'junit',
  retries: {
    runMode: 3,
    openMode: 0,
  },
  reporterOptions: {
    mochaFile: 'results/test-results-[hash].xml',
    toConsole: false,
  },
  video: false,
  env: {
    USERNAME: 'username',
    PASSWORD: 'password',
    FORM_URL: 'https://forms.gridfox.com/BihNR6ATScLA',
  },
  fixturesFolder: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/extensions
      return require('./cypress/plugins/index.ts')(on, config);
    },
    baseUrl: 'https://forms.gridfox.com/BihNR6ATScLA',
    experimentalModifyObstructiveThirdPartyCode: false,
    experimentalSessionAndOrigin: true,
  },
});
