'use strict';

angular.module('metadataTool.version', [
  'metadataTool.version.interpolate-filter',
  'metadataTool.version.version-directive'
])

.value('version', '0.1');
