# ember-cli-appcues

Easily add [Appcues](https://www.appcues.com/) to your Ember app.

## Installation

Please install this addon into your Ember.js project using ember-cli:
```
ember install ember-cli-appcues
```

## Configuration

Add your Appcues App ID into your `config/environment.js` file:

```js
ENV['ember-cli-appcues'] = {
  accountId: '[YOUR_ACCOUNT_ID]',
  lazyLoad: true
};
```

- lazyLoad: wait for the first call to Appcues to load its library.

This addon will automatically call `Appcues.page()` for each transitions as long as `identify` or `anonymous` was first
called.

## Appcues service

This service exposes some of the [AppCues Javascript API](https://docs.appcues.com/article/161-javascript-api).

- Check if `anonymous` or `identify` was called.

```js
  this.get('appcues').isSessionCreated()
```

- `Appcues.identify(userId, userProperties = {})`

```js
  this.get('appcues').identify(userId, userProperties)
```

- `Appcues.anonymous()`

```js
  this.get('appcues').anonymous()
```

- `Appcues.page()`

```js
  this.get('appcues').page()
```

- `Appcues.track(eventName, eventProperties)`

```js
  this.get('appcues').track(eventName, eventProperties)
```

- `Appcues.show(contentId)`

```js
  this.get('appcues').show(contentId)
```

- `Appcues.clearShow()`

```js
  this.get('appcues').clearShow()
```

- `Appcues.debug()`

```js
  this.get('appcues').debug()
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
