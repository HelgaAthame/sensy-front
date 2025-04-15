# For start project

#### Add `.env` file in root folder with the following content:

```
NEXT_PUBLIC_BASE_API_URL='https://api.sensy.by/'
```

#### Make sure you have node.js LTS version installed

#### Install `pnpm` version specified in `package.json`

#### Install dependencies
```
pnpm install
```

#### Create app build
```
pnpm run build
```

#### Run app on port 3000
```
pnpm run start
```

------------------------------

### 🐳 Alternative way to run the app using Docker

If you have Docker installed, you can build and run the application without installing Node.js and pnpm locally:

#### 1. Build the Docker image

```bash
docker build -t sensy .
```

This command will create a Docker image named `sensy` based on the `Dockerfile` in the root directory.

#### 2. Run the container

```bash
docker run -p 3000:3000 --name sensy-app sensy
```

The container will start on port `3000`. The application will be available at:

```
http://localhost:3000
```