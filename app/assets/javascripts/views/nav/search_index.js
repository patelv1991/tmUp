TmUp.Views.SearchIndex = Backbone.View.extend({
  template: JST['nav/search_index'],

  initialize: function (options) {
    this.workspaces = options.workspaces;
    this.users = options.users;
    this.projects = options.projects;
    this.tasks = options.tasks;
  },

  render: function () {
    var content = this.template({
      workspaces: this.workspaces,
      users: this.users,
      projects: this.projects,
      tasks: this.tasks
    });

    this.$el.html(content);
    return this;
  }
});
