# React Starter w/ Express Server, using Parcel

This is a project template that can be used to quickly start a react project. It has minimal dependencies and has a server route that you can use to proxy requests without exposing your api keys.

## Getting Started

Install dependencies:
```
$ npm install
```

Run the build
```
$ npm run build
```

Start the server
```
$ npm run start
```

## Use case

When you create a request to a third party API from the server side (to protect your API key/credentials) you should create a `.env` file with your key.

This will ensure that your private credentials do not get committed to git and will not be exposed to others on Github.

You will also need to modify the `server/server.js` file to make your call to your api url and return back your data to your front end.

An example of a request to a mock server is shown in the file. You will replace this with the API you want data from.

##.env is populated like this: 

```
GROUP_1_URL="https://www.google.com"
GROUP_2_URL="https://www.google.com"
GROUP_3_URL="https://www.google.com"
GROUP_4_URL="https://www.google.com"
ADMIN_PASSWORD="some password"
```

where "https://www.google.com" is replaced with the group url and "some Password is whatever you want the admin password to be. 
