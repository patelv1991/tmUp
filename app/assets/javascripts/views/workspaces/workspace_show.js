TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.projects = this.model.projects();
    this.workTeam = this.model.workTeam();
    this.myTasks = this.model.myTasks();
    this.allMemberships = this.model.allMemberships();
    // this.listenTo(this.model, 'sync', this.renderWorkspaceTitleInNav);
    this.listenTo(this.model, 'sync', this.renderTeamMembers);
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.projects, 'add', this.renderProjectIndexSubview);
    // this.listenTo(this.workTeam, 'sync', this.renderTeamMembers);
    this.listenTo(this.model.workTeam(), 'remove', this.render);
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
      collection: this.workTeam,
      model: this.model
    });
    this.addSubview('#work-team-container', view);
  },

  renderMyTasks: function () {
    var view = new TmUp.Views.TaskIndex({
      collection: this.myTasks,
      model: this.model
    });
    $('body').find('#left-main').html(view.$el);
    view.render();
    //     this.$sideEl.html(view.$el);
    // debugger
    // this.addSubview('#my-tasks-container', view);
  },

  render: function () {
    // this.remove();
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    this.renderProjectIndexSubview();
    this.renderTeamMembers();
    this.renderMyTasks();
    // this.renderActiveWorkspaceTitle();
    Cookies.set('current-workspace-id', this.model.id);
    Cookies.set('current-workspace-title', this.model.escape('title'));
    return this;
  },

  // renderActiveWorkspaceTitle: function () {
  //   debugger
  //   $('.nav-current-workspace-title').html(this.model.escape('title'));
  // }

});
