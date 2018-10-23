import Router from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import ENV from '../config/environment';

export default {
  name: 'ember-cli-appcues',
  initialize(application) {
    const config = ENV['ember-cli-appcues'] || {};

    if (!config.accountId) {
      return;
    }

    application.register('config:appcues', config, { instantiate: false });
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
};
