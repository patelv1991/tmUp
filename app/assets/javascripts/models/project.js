TmUp.Models.Project = Backbone.Model.extend({
  urlRoot: 'api/projects',

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new TmUp.Collections.Tasks([], { project: this });
    }
    return this._tasks;
  },

  parse: function (response) {
    if (response.tasks) {
      this.tasks().set(response.tasks, { parse: true });
      delete response.tasks;
    }
    return response;
  }
});
