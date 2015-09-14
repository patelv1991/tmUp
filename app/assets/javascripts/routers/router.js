TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$landingEl = options.$landingEl;
    this.$mainEl = options.$mainEl;
    this.workspaces = options.workspaces;
  },

  routes: {
    "": "index",
    "workspaces/:id": "show",
    "workspaces/:workspaceId/user/:userId": "userTaskIndex",
    "workspaces/:workspaceId/project/:projectId": "projectTaskIndex"
  },

  index: function () {
    this.workspaces.fetch();
    var view = new TmUp.Views.WorkspacesIndex({
      collection: this.workspaces
    });
    this.currentMainView && this.currentMainView.remove();
    this._swapLandingView(view);
  },

  show: function (id) {
    var workspace = this.workspaces.getOrFetch(id);
    TmUp.CURRENT_WORKSPACE = parseInt(workspace.id);
    this._workspacesShowView = new TmUp.Views.WorkspacesShow({
      model: workspace,
    });
    this.currentLandingView && this.currentLandingView.remove();
    this._swapMainView(this._workspacesShowView);
    this.highlightActivePageOnSidebar(id);
  },

  userTaskIndex: function (workspaceId, userId) {
    var workspace = this.workspaces.getOrFetch(workspaceId);
    if (this._workspacesShowView === undefined) {
      this.show(workspaceId);
    }
    this.changeSubviews();
    var user = new TmUp.Models.TeamMember({
      id: userId,
      workspace_id: workspaceId
    });
    user.fetch({
      data: { workspace_id: workspaceId },
      success: function (user) {
        var view = new TmUp.Views.TaskIndex({
          collection: user.tasks(),
          workspace: workspace,
          user: user,
          renderingAllTasks: true
        });
        $('#tasks-index-container').html(view.$el);
        view.render();
      }.bind(this)
    });
    this.currentLandingView && this.currentLandingView.remove();
    this.removeHighlightedTabs();
  },

  projectTaskIndex: function (workspaceId, projectId) {
    var workspace = this.workspaces.getOrFetch(workspaceId);
    if (this._workspacesShowView === undefined) {
      this.show(workspaceId);
    }

    this.changeSubviews();
    var project = new TmUp.Models.Project({
      id: projectId,
      workspace_id: workspaceId
    });
    project.fetch({
      data: { workspace_id: workspaceId },
      success: function (project) {
        var view = new TmUp.Views.TaskIndex({
          collection: project.tasks(),
          workspace: workspace,
          project: project
        });
        $('#tasks-index-container').html(view.$el);
        view.render();
      }
    });
    this.currentLandingView && this.currentLandingView.remove();
    this.highlightActivePageOnSidebar(workspaceId, projectId);
  },

  highlightActivePageOnSidebar: function (workspaceId, projectId) {
    $('.sidebar-nav div > div ul.projects li div a').removeClass('highlighted');
    if (workspaceId && projectId) {
      $('.sidebar-nav > #my-tasks-heading > a').removeClass('highlighted');
      $projectContainer = $('.sidebar-nav div > div ul.projects li')
                          .find('div[data-project-id="' + projectId + '"]');
      $projectContainer.find('a').addClass('highlighted');
    } else if (workspaceId) {
      $myTasksContainer = $('.sidebar-nav > #my-tasks-heading > a')
                          .addClass('highlighted');
    }
  },

  removeHighlightedTabs: function () {
    $('.sidebar-nav div > div ul.projects li div a').removeClass('highlighted');
    $('.sidebar-nav > #my-tasks-heading > a').removeClass('highlighted');
  },

  changeSubviews: function () {
    $('#tasks-index-container').remove();
    $('#task-show-container').remove();
    $('#page-content-wrapper').append('<div id="tasks-index-container"></div>');
    $('#page-content-wrapper').append('<div id="task-show-container"></div>');
  },

  _swapLandingView: function (view) {
    this.currentLandingView && this.currentLandingView.remove();
    this.currentLandingView = view;
    this.$landingEl.html(view.$el);
    view.render();
  },

  _swapMainView: function (view) {
    this.currentMainView && this.currentMainView.remove();
    this.currentMainView = view;
    this.$mainEl.html(view.$el);
    view.render();
  }
});
