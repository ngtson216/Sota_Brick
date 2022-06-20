# **VMO Training**: NodeJS - Mongoose
VMO Training Exercise for RestAPI using `NodeJS`, `MongoDB` and `Mongoose`.

## Folders Structure
```
.
├── /src
|   ├── /_collections       # stores postman-collection files
|   ├── /_data              # stores data for seeding
|   └── /_public
|       └── /uploads        # stores files via upload
|   ├── /configs            # stores configurations
|   ├── /controllers        # stores controllers
|   ├── /middlewares        # stores middlewares
|   ├── /models             # stores database models
|   ├── /routes             # stores routers
|   ├── /services           # stores services
|   ├── /utils              # stores utilities/helpers
|   ├── seeder.js           # data seeding script
|   └── index.js            # server file
├── .env.local              # template for .env file
├── package.json            # package file
└── README.md               # README file
```


## Setup
### Install package
```shell
npm install
```

### Configuration
Copy the content of the file `.env.local` to your `.env` file, then add your own configurations.

### Operations
```shell
npm run seed:i  # seeding data - insert mode
npm run seed:d  # seeding data - delete mode
npm start       # start sserver
npm run dev     # start server with nodemon
```

### Postman
Import the postman-collection file in `src/_collections` to your Postman.