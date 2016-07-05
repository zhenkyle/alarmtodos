import formated_seconds from 'app/utils/formated_seconds';
  
(function () {
  'use strict';
 
  describe('Utils: formated_seconds', function () {
    describe('with legal value', function () {
      it('should return with expected string', function () {
        assert.equal('00:00:01',formated_seconds(1));
		    assert.equal('00:00:10',formated_seconds(10));
        assert.equal('00:01:00',formated_seconds(60));
        assert.equal('00:25:00',formated_seconds(1500));
        assert.equal('01:00:00',formated_seconds(3600));
      });
    });
    describe('with illegal value', function () {
      it('should return with expected string', function () {
        assert.equal('00:00:0-10',formated_seconds(-10));
      });
    });
  });
})();
