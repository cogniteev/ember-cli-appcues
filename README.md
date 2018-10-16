# ember-cli-appcues

Easily add AppCues to your app.

## Installation

```
# From within your ember-cli project
ember install ember-cli-appcues
```


## Usage

Configure your AppCues App ID:

```js
// config/environment.js
ENV['ember-cli-appcues'] = {
  accountId: '[YOUR_ACCOUNT_ID]'
};
```

## API

This service exposes some of the [AppCues Javascript API](https://docs.appcues.com/article/161-javascript-api).

- `Appcues.identify(userId, userProperties = {})`

```js
  this.get('appcues').identify(userId, userProperties)
```

- `Appcues.page()`

```js
  this.get('appcues').page()
```

- `Appcues.reset()`

```js
  this.get('appcues').reset()
```


## Contributing

### Installation

* `git clone <repository-url>`
* `cd ember-cli-appcues`
* `npm install`

### Linting

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## License

This project is licensed under the [MIT License](LICENSE.md).
