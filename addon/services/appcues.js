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

  _sessionCreated: false,

  disabled: empty('config.accountId'),

  /**
   * @return true if identify() or anonymous() was called, false otherwise.
   */
  isSessionCreated() {
    return this.get('_sessionCreated');
  },

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
    return this._proxy('identify', userId, properties)
      .then(() => this.set('_sessionCreated', true))
  },

  /**
   * Generates a session-based unique ID for the current user.
   */
  anonymous() {
    return this._proxy('anonymous')
      .then(() => this.set('_sessionCreated', true));
  },

  /**
   * Tracks a custom event taken by the current user along with any
   * properties about that event
   */
  track(eventName, eventProperties = {}) {
    return this._identified()
      .then(() => this._proxy('track', eventName, eventProperties));
  },

  /**
   * Forces a specific Appcues flow or checklist to appear for the current user.
   */
  show(contentId) {
    return this._identified()
      .then(() => this._proxy('show', contentId));
  },

  /**
   * Stops force showing any checklists shown using Appcues.show.
   */
  clearShow() {
    return this._proxy('clearShow');
  },

  /**
   * Notifies the SDK that the state of the application has changed.
   */
  page() {
    return this._identified()
      .then(() => this._proxy('page'));
  },

  /**
   * Clears all known information about the current user in this session.
   *
   * This call will clear the flow in progress and wipe any data we generate for a user.
   * This is useful when your user logs out of your application.
   */
  reset() {
    return this.isSessionCreated()
      ? this._proxy('reset')
      : resolve();
  },

  /**
   * Puts AppCues in debug mode
   */
  debug(enable = true) {
    return this._proxy('debug', enable);
  },

  /**
   * Ensures we have a current user
   *
   * @private
   */
  _identified() {
    return this.isSessionCreated()
      ? resolve()
      : this.anonymous();
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
