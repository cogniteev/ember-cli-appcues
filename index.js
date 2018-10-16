'use strict';

module.exports = {
  name: require('./package').name,

  contentFor(type, config) {
    const { lazyLoad, accountId } = config['ember-cli-appcues'] || {};
    if (type === 'body' && accountId && !lazyLoad) {
      return `<script type="text/javascript" src="//fast.appcues.com/${accountId}.js"></script>`;
    }
  }
};
