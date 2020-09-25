# Falcon Vendure API

This is an experimental api provider for [DEITY Falcon](https://github.com/deity-io/falcon). The goal is to allow Falcon to be used as a storefront for [Vendure](https://www.vendure.io/).

## Supported Versions

This package has been tested against:

* @deity/falcon-server v0.15.1
* @deity/falcon-shop-extension v0.15.1
* @deity/falcon-client v0.15.1
* @vendure/core v0.15.1

Since both DEITY Falcon and Vendure are under active development, expect potential instability if attempting to use newer versions than the above.

## Installation

### With demo.vendure.io

The simplest way to test out the Falcon Vendure API is to run it against the online Vendure demo at demo.vendure.io. In this way, you don't need to worry about running your own local Vendure server.

1. `npm install @vendure/falcon-vendure-api`
2. Configure the extension: In the `config/default.json` file, replace the `api-magento2` config with this:
    ```json
    {
    "apis": {
      "api-vendure": {
        "package": "@vendure/falcon-vendure-api",
        "config": {
          "host": "demo.vendure.io",
          "port": 443,
          "apiPath": "shop-api",
          "protocol": "https"
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

    
### With a local Vendure server

1. Set up a Vendure server by following the [getting started guide](https://www.vendure.io/docs/getting-started/).
2. In the Vendure config, set `authOptions.requireVerification` to `false` so that customer accounts can be created without the need for the email verification step.
3. In the Vendure config, set the port to `5000` to avoid conflict with the default Falcon client server.
4. In your Falcon Server project, install `@vendure/falcon-vendure-api`.
5. Configure the extension: In the `config/default.json` file, replace the `api-magento2` config with this:
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

## Testing

1. Start the Falcon client (client is not included in this repo to keep things minimal). To install the client locally, see https://falcon.deity.io/docs/getting-started/installation
2. Run `yarn server` to run this server locally. The client should then connect to it when opening it in the browser at http://localhost:3000
