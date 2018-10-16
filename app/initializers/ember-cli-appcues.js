import Router from '@ember/routing/router';
import { scheduleOnce } from '@ember/runloop';
import { inject } from '@ember/service';
import { on } from '@ember/object/evented';
import { getOwner } from '@ember/application';

export function initialize(/* application */) {
  const config = getOwner(this).resolveRegistration('config:environment');

  const hasAccountId = config['ember-cli-appcues'] && config['ember-cli-appcues']['accountId'];
  if (!hasAccountId) {
    return;
  }

  /**
   * Automatically notify that application state has changed.
   */
  Router.reopen({
    appcues: inject(),

    notifyAppCues: on('didTransition', function() {
      scheduleOnce('afterRender', () => this.get('appcues').page());
    })
  });
}

export default {
  name: 'ember-cli-appcues',
  initialize
};
