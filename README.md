# Frunze

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

__Frunze__ is an Angular2 TypeScript app with Rust API backend. So you'll need to deal with both parts.

## Development setup

### API Server

Run development API server with (localhost:8009 by default):

```bash
$ cd api
$ cargo run
```

or if you'd like to use custom IP address or/and port (don't forget to re-configure client part as well):

```bash
$ cd api
$ cargo run -- --ip 127.0.0.2 --port 8008
```

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

Run `cargo build` from the appropriate directory. The build artifacts will be stored in the `api/target/` directory. Use `--release` flag 
for a production build.

### Client
Run `ng build` from the `ng-app` folder. The build artifacts will be stored in the `ng-app/dist/` directory. Use the `-prod` flag for a 
production build.

## Running unit tests

### API Server

Server part unit tests rely on `stainless` crate and hence require Rust Nightly (the server itself works fine with Rust Stable). It's recommended
to use [`rustup`](https://rustup.rs) to deal with several Rust versions simultaneously. Let's say you use `rustup`, then to run unit tests
just run:

```bash
$ RUSTUP_TOOLCHAIN=nightly cargo test --features stainless
```

### Client

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
