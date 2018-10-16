/* global Appcues */
import Service from '@ember/service';
import { empty } from '@ember/object/computed';
import { resolve } from 'rsvp';
import loadScript from 'ember-cli-appcues/utils/load-script';

/**
 * <a href="https://docs.appcues.com/article/161-javascript-api">Javascript API</a>
 */
export default Service.extend({

  // injected by initializer
  config: null,

  disabled: empty('config.accountId'),

  /**
   * Adds AppCues tag into the application.
   *
   * Unnecessary if lazyLoad is false.
   */
  load() {
    return this.get('config.lazyLoad')
      ? loadScript(`https://fast.appcues.com/${this.get('config.accountId')}.js`)
      : resolve();
  },

  /**
   * Identifies the current user with an ID and an optional set of properties.
   */
  identify(userId, properties = {}) {
    return this._proxy('page', userId, properties);
  },

  /**
   * Notifies the SDK that the state of the application has changed.
   */
  page() {
    return this._proxy('page');
  },

  /**
   * Clears all known information about the current user in this session.
   *
   * This call will clear the flow in progress and wipe any data we generate for a user.
   * This is useful when your user logs out of your application.
   */
  reset() {
    return this._proxy('reset');
  },

  /**
   * Proxify call to the Appcues SDK if service is enabled & loaded.
   *
   * @private
   */
  _proxy(method, ...args) {
    return this.get('disabled')
      ? resolve()
      : this.load().then(() => Appcues[method].call(Appcues, ...args));
  }

});
