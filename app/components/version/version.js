'use strict';

angular.module('myLibrary.version', [
  'myLibrary.version.interpolate-filter',
  'myLibrary.version.version-directive'
])

.value('version', '0.1');
