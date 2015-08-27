TmUp.Collections.Tasks = Backbone.Collection.extend({
  model: TmUp.Models.Task,
  url: 'api/tasks',

  comparator: function(task) {
    return task.get('due_date');
  }
});
