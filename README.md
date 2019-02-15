# Falcon Vendure API

This is an experimental api provider for [DEITY Falcon](https://github.com/deity-io/falcon). The goal is to allow Falcon to be used as a storefront for Vendure.

## Current Status

Currently I have implemented basic product list & detail views. It is very experimental and most aspects are not yet working.

## Development

1. Assumes that the main Vendure repo is cloned in a sibling directory, since the [codegen.yml](./codegen.yml) file is pointing to the Vendure GraphQL introspection schema in that location.
2. Run `yarn start:dev` which will start up:
   * **graphql-code-generator** (to auto generate TypeScript types for the Vendure & Falcon schemas) in watch mode.
   * **tsc** (the TypeScript compiler) in watch mode.
   * **server** which runs an instance of the Deity Falcon server configured to use this Vendure API provider. It runs with nodemon so will automatically restart on changes to the `dist` directory contents.

## Testing

1. Assumes a Vendure server running on port 5000 with the GraphQL api set to "api".
2. The menu config for Falcon client can be configured like this:
    ```json
    {
      "header": [
        {
          "name": "Electronics",
          "url": "/category/2-electronics",
          "children": [
            {
              "name": "Computers",
              "url": "/category/4-computers"
            },
            {
              "name": "Photo",
              "url": "/category/3-photo"
            }
          ]
        }
      ]
    }
    ```
3. Start the Falcon client (client is not included in this repo to keep things minimal)
