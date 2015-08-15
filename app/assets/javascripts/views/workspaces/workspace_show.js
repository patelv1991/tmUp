TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.projects = this.model.projects();
    this.workTeam = this.model.workTeam();
    this.myTasks = this.model.myTasks();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.projects, 'add', this.addProjectIndexSubview);
    this.listenTo(this.workTeam, 'add', this.addTeamMember);
    this.listenTo(this.myTasks, 'add', this.addTasks);
  },


  addProjectIndexSubview: function () {
    var view = new TmUp.Views.ProjectIndex({
      collection: this.projects
    });
    this.addSubview('#projects-container', view);
  },

  addTeamMember: function (member) {
    var view = new TmUp.Views.TeamIndexItem({
      model: member
    });
    this.addSubview('#work-team', view);
  },

  addTasks: function (task) {
    var view = new TmUp.Views.TaskIndexItem({
      model: task
    });
    this.addSubview('#my-tasks', view);
  },

  render: function () {
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    this.addProjectIndexSubview();
    this.renderWorkTeam();
    this.renderMyTasks();
    Cookies.set('current-workspace-id', this.model.id);
    Cookies.set('current-workspace-title', this.model.escape('title'));
    return this;
  },

  renderWorkTeam: function () {
    this.model.workTeam().each(this.addTeamMember.bind(this));
  },

  renderMyTasks: function () {
    this.model.myTasks().each(this.addTasks.bind(this));
  }
});
