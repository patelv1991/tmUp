TmUp.Models.Workspace = Backbone.Model.extend({
  urlRoot: 'api/workspaces',

  projects: function () {
    if (!this._projects) {
      this._projects = new TmUp.Collections.Projects([], { workspace: this });
    }

    return this._projects;
  },

  workTeam: function () {
    if (!this._workTeam) {
      this._workTeam = new TmUp.Collections.WorkTeam([], { workspace: this });
    }

    return this._workTeam;
  },

  myTasks: function () {
    if (!this._myTasks) {
      this._myTasks = new TmUp.Collections.Tasks([], { workspace: this });
    }

    return this._myTasks;
  },

  parse: function (response) {
    if (response.projects) {
      this.projects().set(response.projects, { parse: true });

      response.projects.forEach(function (project) {
        this.myTasks().add(project.tasks, { parse: true });
      }.bind(this));

      delete response.projects;
    }

    if (response.team_members) {
      this.workTeam().set(response.team_members, { parse: true });
      delete response.team_members;
    }

    return response;
  }
});
