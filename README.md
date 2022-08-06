# Test Backend Locally

create `.env`:

```sh
PORT = 8000 # optional default to 5000

TOKEN_SECRET="super secret" # jwt secret

BCRYPT_PASSWORD="your secret string" # hashing password
SALT_ROUNDS=10 # hashing password

MONGO_DB_URL="your mongoDB url" 
```

Run:

- `npm install`
- `npm start`

Note:
`project will listen to the following url (127.0.0.1:5000)`

# Test FontEnd Locally

Run:

- `cd frontend/`
- `npm install`
- `npm start`

Note:
`project will listen to the following url (127.0.0.1:3000)`

# future work

## backend

- morgan login
- api end points documentation
