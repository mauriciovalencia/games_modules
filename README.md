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
## Open react application from another device in same network
```bash
# Expose server in the same network
pnpm/npm run dev -- --host

# Listen on all interfaces
pnpm/npm run dev -- --host 0.0.0.0

# Get the server's local network IP
Mac/Linux ifconfig | grep inet
Linux: ip a
Windows: ipconfig 

On start, the server allows requests from local and network devices like this

  VITE v6.1.0  ready in 343 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.86:5173/
  ➜  press h + enter to show help

## Remember! Don't forget to add firewall exceptions on the server or disable it for testing.

& enjoy the result!.

```
<img src="https://github.com/user-attachments/assets/c5ab6615-0434-4dcb-9c13-5f29e70fd686" width="300">


## Future Improvements
Some details were not covered:

- Unit tests.
- Sincronization data in locaStorage with a API service maybe in rest or graphql.
- Consideration of an event-driven approach in React to avoid the dreaded coupling.
- Minor improvemnts for install modules very easily

All of this, and many more improvements, could be included in a future version—possibly version 0.4.0 or beyond.
