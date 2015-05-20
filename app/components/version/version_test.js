'use strict';

describe('metadataTool.version module', function() {
  beforeEach(module('metadataTool.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual(globalConfig.version);
    }));
  });
});
