import Todo from 'app/models/todo';
import sinon from 'sinon';
  
  (function () {
  'use strict';

 
  describe('Model: Todo', function () {
    describe('new Todo', function () {
      it('should return with defaults', function () {
      	var todo = new Todo;
		    assert.equal(todo.get('title'),'empty todo...');
        assert.equal(todo.get('order'),0);
      });
      it('should return with seted title', function () {
        var todo = new Todo({title:'abc'});
        assert.equal(todo.get('title'),'abc');
        assert.equal(todo.get('order'),0);
      });
      it('should return with seted collection', function () {
        var todo = new Todo({title:'abc'},{collection: {nextOrder: sinon.stub().returns(42)}});
        assert.equal(todo.get('title'),'abc');
        assert.equal(todo.get('order'),42);
      });
    });
  });
})();
