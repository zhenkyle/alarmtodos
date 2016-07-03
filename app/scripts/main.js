/*global $*/
import TodoList from './collections/todolist';
import AppView from './views/appview';

  // Create our global collection of **Todos**.
  var Todos = new TodoList;

  // Finally, we kick things off by creating the **App**.
  var app = new AppView({collection: Todos});