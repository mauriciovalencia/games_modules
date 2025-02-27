# Module Games

User interface for playing different module games.

**Table of Contents**
- [Environment requirements](#markdown-header-environment-requirements)
- [Environment Variables](#markdown-header-environment-variables)
- [Installation](#markdown-header-installation)
- [Execution](#markdown-header-execution)

## Environment requirements
```
- Node v22.12.x or more
- Pnpm 9.15.x or more
```

Then, on local environment case, just cloning the repo in your local environment, and make a `.env`
file with the mandatory variables mentioned in [.env.example](/.env.example)
and described in detail in this document.

## Environment Variables

Operational

| Name           | Type     | Options    | Default      | Description                    |
|----------------|----------|------------|--------------|--------------------------------|
| VITE_DEBUG     | Boolean  | true/false | true         | Running on dev/prod environment |
| VITE_APP_NAME  | String   | Secret LEvel | Secret LEvel | Name of application            |

Functional

| Name                | Type    | Options | Default                      | Description                         |
|---------------------|---------|---------|------------------------------|-------------------------------------|
| VITE_API_IMAGES_URL | String  |         | https://challenge-uno.vercel.app/api/images | User API service url                |
|    |   |         |                              |               |


## Installation

```bash
# Step by Step

git clone this-repository

# copy .env values to .env execution
cp .env.example .env

# install web application libs
pnpm install

# run application
pnpm run dev

# load in the web browser
# * copy url eg:http://localhost:5173/ and paste in url box from the web-browser, by default Google Chrome.

## Remember!, pnpm install, install libs for the web aplication could run
```
## Execution react application

```bash
# installation
pnp install

# development (prefereable)
pnpm run dev

# production
pnpm run build
```

## Future Improvements
Some details were not covered:

- Unit tests.
- Sincronization data in locaStorage with a API service maybe in rest or graphql.
- Consideration of an event-driven approach in React to avoid the dreaded coupling.
- Minor improvemnts for install modules very easily

All of this, and many more improvements, could be included in a future version—possibly version 0.4.0 or beyond.
