TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.projects = this.model.projects();
    this.workTeam = this.model.workTeam();
    this.myTasks = this.model.myTasks();
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.projects, 'add', this.renderProjectIndexSubview);
    this.listenTo(this.workTeam, 'add', this.renderTeamMembers);
    this.listenTo(this.myTasks, 'add', this.renderMyTasks);
  },

  renderProjectIndexSubview: function () {
    var view = new TmUp.Views.ProjectIndex({
      collection: this.projects
    });
    this.addSubview('#projects-container', view);
  },

  renderTeamMembers: function () {
    var view = new TmUp.Views.TeamIndex({
      collection: this.workTeam
    });
    this.addSubview('#work-team-container', view);
  },

  renderMyTasks: function () {
    var view = new TmUp.Views.TaskIndex({
      collection: this.myTasks
    });
    this.addSubview('#my-tasks-container', view);
  },

  render: function () {
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    this.renderProjectIndexSubview();
    this.renderTeamMembers();
    this.renderMyTasks();
    Cookies.set('current-workspace-id', this.model.id);
    Cookies.set('current-workspace-title', this.model.escape('title'));
    $('.nav-current-workspace-title').html(this.model.escape('title'));
    return this;
  },


});
