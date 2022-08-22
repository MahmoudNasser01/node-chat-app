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
`project will listen to the following url (127.0.0.1:8000)`

to test chat 1:1 open the url at [` / `](http://localhost:8000/)

# Test FontEnd Locally

Run:

- `cd frontend/`
- `npm install`
- `npm start`

Note:
`project will listen to the following url (127.0.0.1:3000)`

# future work

## backend

- api end points documentation

# EndPoints :)
- signup [ x ]
- login [ x ]
- logout [ x ]
- search all users [ x ]  `users/`
- get a user by id [ ] `users/:id`
- update a user data by id [ ] `users/:id` PUT
- delete a user by id [ ] `users/:id` DELETE
- get all chats [ ] `chats/` GET
- get a chat by id [ ] `chats/:id`GET
- search for a chat [ ] `chats/search/:id` GET
- get a message by id [ ] `chats/:id/messages/:id` GET
- create new group [ ] `chats/` POST
- user can create a message [ ] `chats/:id/messages/` POST
- user can update a message by id [ ] `chats/:id/messages/:id` PUT
- user can delete a message by id [ ] `chats/:id/messages/:id` DELETE
- user add users to a group [ ] `chats/:id/add/` POST
- remove users from a group [ ] `chats/:id/remove/` POST
- set group admin [ ] `chats/:id/admin/` POST
- update group settings [ ] `chats/:id/settings/` PUT
- banned chats [ ] `chats/:id/banned/` POST