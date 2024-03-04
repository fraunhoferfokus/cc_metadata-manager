**This project incorporates elements from the open-source project [CLM](https://github.com/fraunhoferfokus/clm-core) to facilitate its functionality.**

**This microservice is based upon [license-core](https://github.com/fraunhoferfokus/cc_license-core) and extends the basic functionalities with additional features.**

# CC-METADATA-MANAGER
Product metadata component for collecting and providing product metadata according to IMS Metadata (LOM, currently in version 1.2.1).

Acts as a proxy server, allowing product metadata providers (publishers) to register with the component. When product metadata is requested by the license management, the component forwards it to the appropriate endpoint. Via plugin: Allows the translation of BiLo product metadata into IMS Metadata (LOM, v1.2.1).

# Requirements:
* MariaDB Version 10x
* Redis Version 6x
* Node.js Version 20x
* [BiLo](https://info.bildungslogin.de/) (OIDC) authentication service credentials for extracting license informations

# Quick Start:


Install node_modules in the respective git submodules with their respective dependencies by running: 

```npm install```

It is also necessary to copy .env.default file to .env and insert the appropriate values. Please contact the owner of this repository to the values. A description of the values is also given in the file itself.

(UNIX)
```cp .env.default .env.local```

The following table gives an overview of the settings you can change through the environment variables:
| Name                                            | Example                                                | Required (Yes/No) | Description                                                                                                           |
|-------------------------------------------------|--------------------------------------------------------|-------------------|-----------------------------------------------------------------------------------------------------------------------|
| `PROTOCOL`                                      | `http`                                                 | Yes               | The protocol used for the manager service connection.                                                                 |
| `HOST`                                          | `127.0.0.1`                                            | Yes               | The host address for the manager service.                                                                             |
| `PORT`                                          | `3042`                                                 | Yes               | The port on which the manager service is running.                                                                     |
| `BASE_PATH`                                     | `/managers/metadata`                                   | Yes               | The base path for the manager service's endpoints.                                                                    |
| `CORS_ACCESS_CONTROL_ALLOW_ORIGIN`              | `"*"`                                                  | Yes               | CORS setting for allowing requests from any origin.                                                                   |
| `METADATA_PROVIDER_API_PROTOCOL`                | `http`                                                 | Yes               | The protocol used to connect to the product metadata provider API.                                                   |
| `METADATA_PROVIDER_API_HOST`                    | `127.0.0.1`                                            | Yes               | The host address for the product metadata provider API.                                                               |
| `METADATA_PROVIDER_API_PORT`                    | `3041`                                                 | Yes               | The port on which the product metadata provider API is running.                                                       |
| `METADATA_PROVIDER_API_BASE_PATH`               | (empty)                                                | Yes               | The base path for the product metadata provider API's endpoints. Note: It's specified as empty in the provided config. |
| `LAUNCH_METADATA_PROVIDER_API_PROTOCOL`         | `http`                                                 | Yes               | The protocol used for the product launch metadata provider API connection.                                            |
| `LAUNCH_METADATA_PROVIDER_API_HOST`             | `127.0.0.1`                                            | Yes               | The host address for the product launch metadata provider API.                                                        |
| `LAUNCH_METADATA_PROVIDER_API_PORT`             | `3043`                                                 | Yes               | The port on which the product launch metadata provider API is running.                                                |
| `LAUNCH_METADATA_PROVIDER_API_BASE_PATH`        | `/services/productLaunchMetadata`                       | Yes               | The base path for the product launch metadata provider API's endpoints.                                               |
| `METADATA_BILO_API`                             |                                                        | No                | The API endpoint for BILO metadata operations.                                                                        |
| `OIDC_AUTH_BILO_ENDPOINT`                       |                                                        | Yes               | The authentication endpoint for OIDC BILO.                                                                            |
| `OIDC_BILO_CLIENT_ID`                           |                                                        | Yes               | The client ID for OIDC BILO authentication.                                                                           |
| `OIDC_BILO_CLIENT_SECRET`                       |                                                        | Yes               | The client secret for OIDC BILO authentication.                                                                       |


Afterward just startup the server with following command:

```npm run dev```


# Structure
The project follows following structure

├── app/ # All source files for the busines logic of the server  
│  
└── README.md # The file you're reading now


### Changelog

The changelog can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Get in touch with a developer

Please see the file [AUTHORS.md](AUTHORS.md) to get in touch with the authors of this project.
We will be happy to answer your questions at {clm@fokus.fraunhofer.de}

## License


The project is made available under the license in the file [LICENSE.txt](license.txt)