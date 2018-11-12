# ![](https://storage.googleapis.com/app.calorify.jsoutof.space/logo-25x25.png) Calorify ![](https://storage.googleapis.com/app.calorify.jsoutof.space/logo-25x25.png) your daily calories tracker ![](https://storage.googleapis.com/app.calorify.jsoutof.space/logo-25x25.png)

**Calorify** is an web application that helps you track your daily calories. Once you create your account you can start adding every meal you eat during the day. You can set your own daily calories limit and filter all the consumed meals over time in order to see once the meals that you are interested in.

# Live

The application is **live**, hosted on **Google Cloud** and you can find it here: [http://app.calorify.jsoutof.space](http://app.calorify.jsoutof.space)

If you are interested in the **REST API** only, you can check it here: [http://api-calorify.jsoutof.space](http://api-calorify.jsoutof.space/)

To help you out in testing the API only you can use the following [Postman](https://www.getpostman.com/) collection: [LINK](https://www.getpostman.com/collections/e62ee7edf56dc366277f)

# Tech stack
The codebase contains two projects. One for the **client application** and one for the **REST API**.

### Back-end
* **Node.js** (using the **Koa** framework)
* **PostgreSQL** (using **knex** query builder)
* **TypeScript** (type checker)
* **TSLint** (with airbnb linter rules)
* **Jest** (for unit testing)

### Front-end
* **React** (UI library)
* **Redux** (state management)
* **Material-UI** and **styled-components** (stylization)
* **Babel** (transpiler)
* **Parcel** (bundler)
* **ESLint** (with airbnb linter rules)
* **Jest** (for unit, snapshot and end-to-end testing)
* **Puppeteer** (for end-to-end testing)

# Documentation
You can find all the project related information (both for the client and the API) on the following link: [https://vidimi7rov.gitbook.io/calorify](https://vidimi7rov.gitbook.io/calorify)

There are instructions on how to setup the project if you want to run it **locally**, details about the project architecture, main tools and technologies that are used and how all the modules work. 