TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    // debugger
    this.projects = this.model.projects();
    this.workTeam = this.model.workTeam();
    this.myTasks = this.model.myTasks();
    this.allMemberships = this.model.allMemberships();
    this.listenTo(this.model.projects(), 'remove', this.render);
    // this.listenTo(this.model, 'sync', this.renderTeamMembers);
    // this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.projects, 'sync', this.renderProjectIndexSubview);
    // this.listenTo(this.workTeam, 'sync', this.renderTeamMembers);
    // this.listenTo(this.model.workTeam(), 'remove', this.render);
    // this.listenTo(this.model.projects(), 'change remove', this.render);
    // this.listenTo(this.myTasks, 'remove', this.render);
  },

  renderProjectIndexSubview: function () {
    var view = new TmUp.Views.ProjectIndex({
      collection: this.projects,
      workspace: this.model
    });
    this.addSubview('#projects-container', view);
  },

  renderTeamMembers: function () {
    var view = new TmUp.Views.TeamIndex({
      collection: this.workTeam,
      workspace: this.model
    });
    this.addSubview('#work-team-container', view);
  },

  renderMyTasks: function () {
    var view = new TmUp.Views.TaskIndex({
      collection: this.myTasks,
      workspace: this.model,
      renderingAllTasks: true
    });
    this.addSubview('#tasks-index-container', view);
  },

  render: function () {
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    this.renderProjectIndexSubview();
    this.renderTeamMembers();
    this.renderMyTasks();
    Cookies.set('current-workspace-id', this.model.id);
    Cookies.set('current-workspace-title', this.model.escape('title'));
    return this;
  },

});
