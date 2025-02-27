# Concentration Games

<img alt="Concentration Games" src="./src/assets/logo.png" title="Games" width="200"/>

User interface for playing memory-based concentration games.

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
pnpm install
```

## Execution

```bash
# development
pnpm start

# development watch behavior 
pnpm start:dev

# production
pnpm start:prod
```