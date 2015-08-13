TmUp.Models.Workspace = Backbone.Model.extend({
  urlRoot: 'api/workspaces',

  projects: function () {
    if (!this._projects) {
      this._projects = new TmUp.Collections.Projects([], { workspace: this });
    }

    return this._projects;
  },

  parse: function (response) {
    if (response.projects) {
      this.projects().set(response.projects, { parse: true });
      delete response.projects;
    }

    return response;
  }
});
