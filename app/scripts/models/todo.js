/*global Alarmtodos, Backbone*/

Alarmtodos.Models = Alarmtodos.Models || {};

(function () {
  'use strict';

  // Our basic **Todo** model has `title`, `order`, and `done` attributes.
  Alarmtodos.Models.Todo = Backbone.Model.extend({

    // Default attributes for the todo item.
    defaults: function() {
      return {
        title: "empty todo...",
        order: Alarmtodos.Todos.nextOrder(),
        done: false
      };
    },

    // Ensure that each todo created has `title`.
    initialize: function() {
      if (!this.get("title")) {
        this.set({"title": this.defaults().title});
      }
    },

    // Toggle the `done` state of this todo item.
    toggle: function() {
      this.save({done: !this.get("done")});
    }

  });

})();
