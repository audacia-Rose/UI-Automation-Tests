/**
 * Mappings for environment variables
 */
 export default class Env {
    // The homepage url of the app
    static readonly HomepageUrl = Cypress.env('HOMEPAGE_URL');

    // The base url of the api
    static readonly BaseApiUrl = Cypress.env('BASE_API_URL')
 }