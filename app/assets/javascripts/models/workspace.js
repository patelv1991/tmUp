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

  allMemberships: function () {
    if (!this._allMemberships) {
      this._allMemberships = new TmUp.Collections.workspaceMemberships([], { workspace: this });
    }

    return this._allMemberships;
  },

  parse: function (response) {
    if (response.projects) {
      this.projects().set(response.projects, { parse: true });
      delete response.projects;
    }

    if (response.team_members) {
      this.workTeam().set(response.team_members, { parse: true });
      delete response.team_members;
    }

    if (response.my_tasks) {
      this.myTasks().set(response.my_tasks, { parse: true });
      delete response.my_tasks;
    }

    if (response.workspace_memberships) {
      this.allMemberships().set(response.workspace_memberships, { parse: true });
      delete response.workspace_memberships;
    }
    return response;
  }
});
