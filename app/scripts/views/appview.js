/*global Backbone, _, Todos*/
import TodoView from './todoview';
import Settings from '../models/settings';
import Beep from 'beepjs';

export default Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $('#todoapp'),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'keypress #new-todo':  'createOnEnter',
      'click #clear-completed': 'clearCompleted',
      'click #toggle-all': 'toggleAllComplete',
      'click #start-alarm': 'startAlarm',
      'click #stop-alarm': 'stopAlarm',
      'click #beep-every-second': 'toggleSettings'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {

      this.input = this.$('#new-todo');
      this.allCheckbox = this.$('#toggle-all')[0];
      this.beepCheckbox = this.$('#beep-every-second')[0];

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.addAll);
      this.listenTo(this.collection, 'all', this.render);
      this.listenTo(this.settings, 'all', this.render);

      this.footer = this.$('footer');
      this.main = $('#main');

      this.timeoutID = null;
      this.first_remaining = null;

      var volume = 1 // Volume is a float. 0 is silenced, 1 is full volume
      var waveType = 'square' // WaveType is a string that describes the shape of the sound wave. Options are 'square', 'sine', 'triangle', or 'sawtooth'.
      this.beep = new Beep(volume, waveType);

      this.settings = new Settings;
      this.settings.fetch();

      this.collection.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
      var done = this.collection.done().length;
      var remaining = this.collection.remaining().length;
      var timeoutID = this.timeoutID;

      if (this.collection.length) {
        this.main.show();
        this.footer.show();
        this.footer.html(this.statsTemplate({done: done, remaining: remaining, timeoutID: timeoutID}));
      } else {
        this.main.hide();
        this.footer.hide();
      }

      this.allCheckbox.checked = !remaining;
      this.beepCheckbox.checked = this.settings.get('beep_every_second');
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new TodoView({model: todo});
      this.$('#todo-list').append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      this.collection.each(this.addOne, this);
    },

    // If you hit return in the main input field, create new **Todo** model,
    // persisting it to *localStorage*.
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      if (!this.input.val()) return;
      var splits = this.input.val().split('/', 2);
      splits[1] = splits[1] || 25;
      splits[1] = eval(splits[1].valueOf()*60);
      this.collection.create({title: splits[0], elapse: splits[1]});
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      clearTimeout(this.timeoutID);
      this.first_remaining = null;
      this.timeoutID = null;
      _.invoke(this.collection.done(), 'destroy');
      return false;
    },

    toggleAllComplete: function () {
      clearTimeout(this.timeoutID);
      this.first_remaining = null;
      this.timeoutID = null;
      var done = this.allCheckbox.checked;
      this.collection.each(function (todo) { todo.save({'done': done}); });
    },

    toggleSettings: function () {
      var beep_every_second = this.beepCheckbox.checked;
      this.settings.save({'beep_every_second': beep_every_second});
    },

    startAlarm: function () {
      if (!this.timeoutID) {
        this.first_remaining = _.first(this.collection.remaining());
        var func = _.bind(this.startAlarm,this);
        this.timeoutID = _.delay(func,1000);
        this.render(); // render footer after timoutID change
        return;
      }
      var elapse = this.first_remaining.get('elapse');
      if (elapse <= 1 ) {
        this.first_remaining.fetch(); //restore model's elapse to localStorage value
        this.first_remaining.set({done: true});  // don't save automatic done to localStorage
        this.first_remaining = null;
        this.timeoutID = null;
        this.render(); // render footer after timoutID change
        this.beep.beep([
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300],
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300],
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300],
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300],
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300],
          [1000, 100],[0, 100],[1000, 100],[0, 100],[1000, 100],[0, 300]
          ]);
      } else {
        this.first_remaining.set({'elapse': elapse -1 });
        var func = _.bind(this.startAlarm,this);
        this.timeoutID = _.delay(func,1000);
        if (this.settings.get('beep_every_second') == true) {
          this.beep.beep([[1000, 100]]);
        }
      }
    },

    stopAlarm: function () {
      clearTimeout(this.timeoutID);
      this.first_remaining = null;
      this.timeoutID = null;
      this.render(); // render footer after timoutID change
    }

  });