# Falcon Vendure API

This is an experimental api provider for [DEITY Falcon](https://github.com/deity-io/falcon). The goal is to allow Falcon to be used as a storefront for [Vendure](https://www.vendure.io/).

## Current Status

Most of the basic functions are working - listing products, adding to cart, checking out etc. Modifying customer details is not yet supported.

## Installation

1. Set up a Vendure server by following the [getting started guide](https://www.vendure.io/docs/getting-started/). Requires v0.1.0-alpha.6 or above.
2. In the Vendure config, set `authOptions.requireVerification` to `false` so that customer accounts can be created without the need for the email verification step.
3. In the Vendure config, set the port to `5000` to avoid conflict with the default Falcon client server.
3. In your Falcon Server project, install `@vendure/falcon-vendure-api`.
4. Configure the extension: In the `config/default.json` file, replace the `api-magento2` config with this:
    ```json
    {
    "apis": {
      "api-vendure": {
        "package": "@vendure/falcon-vendure-api",
        "config": {
          "host": "localhost",
          "port": 5000,
          "apiPath": "shop-api",
          "protocol": "http"
        }
      }
    },
    "extensions": {
      "shop": {
        "package": "@deity/falcon-shop-extension",
        "config": {
          "api": "api-vendure"
        }
      }
    }
    }
    ```

## Development

1. Assumes that the main Vendure repo is cloned in a sibling directory, since the [codegen.yml](./codegen.yml) file is pointing to the Vendure GraphQL introspection schema in that location.
2. Run `yarn start:dev` which will start up:
   * **graphql-code-generator** (to auto generate TypeScript types for the Vendure & Falcon schemas) in watch mode.
   * **tsc** (the TypeScript compiler) in watch mode.
   * **server** which runs an instance of the Deity Falcon server configured to use this Vendure API provider. It runs with nodemon so will automatically restart on changes to the `dist` directory contents.

## Testing

1. Assumes a Vendure server running on port 5000 with the GraphQL api set to "api".
2. Start the Falcon client (client is not included in this repo to keep things minimal)
