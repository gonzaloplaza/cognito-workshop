# Cognito Workshop REST API

[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://www.typescriptlang.org/)
![GitHub Repo Size](https://img.shields.io/github/repo-size/gonzaloplaza/cognito-workshop)
[![License MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This is another Express + TypeScript + DDD (Domain Driven Design patterns) + IoC/DI (Inversion of
control and Dependency injection) + API REST boilerplate.

Author: Gonzalo Plaza

## Installation and Configuration

```bash
yarn install
```

### Generate .env file

```bash
cp .env.dist .env
```

You have to configure local environment variables with your own  parameters inside _.env_ file. 
These are the default values:

```env
PORT=3000
APP_NAME="cognito-workshop"
APP_LOG_LEVEL="debug"
COGNITO_USER_POOL="your_cognito_user_pool"
COGNITO_CLIENT_ID="your_cognito_client_id"
COGNITO_REGION="your-aws-region-x"

```

### Development with nodemon (Runs on 3000 port)

```bash
yarn dev
```

### Run tests and generate coverage report

```bash
yarn test #In progress
```

### Build/Compile JS (to /dist folder)

```bash
yarn build
```

### Authentication with AWS Cognito

AWS Cognito is implemented as default authentication service. Please, check documentation on how to
configure it for more details: https://aws.amazon.com/cognito/getting-started/

---

### Docker Compose (for development)

This project is ready to work with **[docker-compose 3.8](https://docs.docker.com/compose/)** to
initialize the needed stack during development process. To start working run the following commands:

```bash
docker-compose build
docker-compose up
```

### Working docker compose environment (Port 8080)

```bash
curl http://localhost:8080/
```

Example JSON response (/):

```json
{
  "success": true,
  "message": "Hello Cognito Workshop",
  "timestamp": 1648208765884
}
```

### Build Docker image for production

You can build an optimized Docker production-ready image with the standard command:

```sh
docker build --no-cache -t cognito-workshop .
```

And then run the container passing environment variables within the initialization:

```sh
docker run --rm -it -p 3000:3000 \
  -e NODE_ENV=production \
  -e COGNITO_USER_POOL="your_cognito_user_pool" \
  -e COGNITO_CLIENT_ID="your_cognito_client_id" \
  -e COGNITO_REGION="your-aws-region-x" \
  --name cognito-workshop cognito-workshop
```
