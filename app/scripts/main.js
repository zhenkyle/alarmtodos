/*global Alarmtodos, $*/


window.Alarmtodos = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  init: function () {
    'use strict';

	// Create our global collection of **Todos**.
	this.Todos = new this.Collections.TodoList;

	// Finally, we kick things off by creating the **App**.
	new this.Views.AppView();
  }
};

$(document).ready(function () {
  'use strict';
  Alarmtodos.init();
});
