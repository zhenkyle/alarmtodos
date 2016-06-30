import TodoList from '../../app/scripts/collections/todolist';
import Todo from '../../app/scripts/models/todo';
  
  (function () {
  'use strict';

 
  describe('Give it some context', function () {
    describe('maybe a bit more context here', function () {
      it('should run here few assertions', function () {
        var Todos = new TodoList;
      	var todo = new Todo({collection: Todos });
		assert.equal(todo.title,"empty title...");
      });
    });
  });
})();
