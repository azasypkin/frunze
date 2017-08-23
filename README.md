# Frunze

[![Build Status](https://travis-ci.org/azasypkin/frunze.svg?branch=master)](https://travis-ci.org/azasypkin/frunze)
[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](https://raw.githubusercontent.com/azasypkin/frunze/master/LICENSE)

__Frunze__ is easy but powerful Web IDE that allows to model your own IoT device based on widely known component architecture. You don't 
have to be developer to get started as modeling is as simple as just adding functional pieces via drag&drop from available list of 
components (button, LED, ADC, DAC, Bluetooth, WiFi, sensors etc.) components.

Using full power of modern web browser you can customize and style your components as much as you wish!

Later on your work can be exported as 3D/CAD models, BOM, circuit diagrams, Gerbers, GCode and more. Also you can choose a platform
independent JSON format that can potentially be used by 3rd-party postprocessor. If all you need can fit into off the shelf components and 
IoT boards you'll be prompted with this option as well.

Stay tuned!

__Current status:__ in active development.


# Development

__Frunze__ is an Angular2 TypeScript app with Rust API backend and MongoDB database. So you'll need to deal with all parts.

## Development setup

If you just want to give Frunze a try and skip environment setup then use provided Docker Compose file:

```bash
$ docker-compose up
```

Once everything is downloaded, compiled and run you'll see something like this in the terminal window `** NG Live Development Server is running on http://0.0.0.0:4200 **`. 
So open that address in your browser and you're done!

Please, read below if you'd like to have more control over the development setup.

### Database

When you run DB container for the first time you'll have to fill database with the initial data:

```bash
$ docker-compose run db /data/preloaded/preload.sh
```

Usually you don't have to deal with the DB itself too much, so you can leverage Docker Compose to run the DB server with
exposed port:

```bash
$ docker-compose create db
$ docker-compose start db
``` 

To check if mongoDB is running, just go to `http://localhost:27017` in you browser, and you should see this message. 
`It looks like you are trying to access MongoDB over HTTP on the native driver port.`.

To stop mongoDB:

```bash
$ docker-compose stop db
``` 

### Fritzing

Frunze uses [Fritzing](http://fritzing.org/home/) to work with project schematic (build, export to SVG etc.). To save you
some time we provide Docker image with the latest compiled Fritzing ready for your disposal. When you run Fritzing
container for the first time you'll have to create it:

```bash
$ docker-compose create fritzing
```

After that just run it:

```bash
$ docker-compose run fritzing
``` 

To stop Fritzing container:

```bash
$ docker-compose stop fritzing
``` 

Checkout `docker-compose.yml` for default settings that you can modify if you want to.

### API Server

To setup API server please follow the instructions from [Frunze API repository](https://github.com/azasypkin/frunze-api/blob/master/README.md).

### Client

Once you have a running API server you can go and run the client part:

```bash
$ cd ng-app
$ ng serve
```

After that navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

There is also option to run the app in a dedicated Docker container if you just want to check it out:

```bash
$ cd ng-app
$ docker build -t frunze-ng-app:dev .
$ docker run -d --name frunze-ng-app -p 4200:4200 frunze-ng-app:dev
```

Docker command line arguments are quite obvi    ous so there is no need to explain them. Once you're done stop container with:

```bash
$ docker stop frunze-ng-app
```

## Build

### API Server

To build API server please follow the instructions from [Frunze API repository](https://github.com/azasypkin/frunze-api/blob/master/README.md#build-server).

### Client
Run `ng build` from the `ng-app` folder. The build artifacts will be stored in the `ng-app/dist/` directory. Use the `-prod` flag for a 
production build.

## Running unit tests

### API Server

To run API server unit-tests please follow the instructions from [Frunze API repository](https://github.com/azasypkin/frunze-api/blob/master/README.md#run-unit-tests).

### Client

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
