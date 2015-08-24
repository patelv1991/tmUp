TmUp.Models.TeamMember = Backbone.Model.extend({
  urlRoot: 'api/users',

  initialize: function () {
    this.color = this.randomColor();
  },

  randomColor: function () {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = '000000';
    var z1 = z.substring(0,y);
    return "#" + z1 + x;
  },

  projects: function () {
    if (!this._projects) {
      this._projects = new TmUp.Collections.Projects([], { user: this });
    }
    return this._projects;
  },

  tasks: function () {
    if (!this._tasks) {
      this._tasks = new TmUp.Collections.Tasks([], { user: this });
    }
    return this._tasks;
  },

  parse: function (response) {
    if (response.projects) {
      this.projects().set(response.projects, { parse: true });
      delete response.projects;
    }

    if (response.tasks) {
      debugger
      this.tasks().set(response.tasks, { parse: true });
      delete response.tasks;
    }
    return response;
  }
});
