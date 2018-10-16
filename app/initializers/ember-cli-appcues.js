import Router from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import config from '../config/environment';


export function initialize(application) {
  const addonConfig = config['ember-cli-appcues'] || {};

  if (!addonConfig.accountId) {
    return;
  }

  application.register('config:appcues', addonConfig, { instantiate: false });
  application.inject('service:appcues', 'config', 'config:appcues');

  /**
   * Automatically notify that application state has changed.
   */
  Router.reopen({
    appcues: inject(),

    notifyAppCues: on('didTransition', function() {
      if (this.get('appcues').isSessionCreated()) {
        scheduleOnce('afterRender', () => this.get('appcues').page());
      }
    })
  });
}

export default {
  name: 'ember-cli-appcues',
  initialize
};
