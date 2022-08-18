# Kleding API

To start this API, create a `.env` file in the root of this folder with this content

```
NODE_ENV="development"
DATABASE_URL=""
```

Database_url has to be a valid mongodb connectionstring
```
mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
```

## How to start
### Seed your database
Seed your database with `prisma seed db`.

[Prisma documentation](https://www.prisma.io/docs/getting-started/quickstart)

### Run the app
Run the app with `yarn start`.

## Common errors

* Modules not found errors, try this and run again:

```
yarn install
```
* Others: Google is your friend