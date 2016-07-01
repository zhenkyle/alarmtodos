import Todo from '../../app/scripts/models/todo';
import sinon from 'sinon';
  
  (function () {
  'use strict';

 
  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
      	var todo = new Todo;
		    assert.equal(todo.get('title'),'empty todo...');
        assert.equal(todo.get('order'),0);
      });
      it('should run here few assertions', function () {
        var todo = new Todo({title:'abc'});
        assert.equal(todo.get('title'),'abc');
        assert.equal(todo.get('order'),0);
      });
      it('should run here few assertions', function () {
        var todo = new Todo({title:'abc',collection: {nextOrder: sinon.stub().returns(42)}});
        assert.equal(todo.get('title'),'abc');
        assert.equal(todo.get('order'),42);
      });
    });
  });
})();
