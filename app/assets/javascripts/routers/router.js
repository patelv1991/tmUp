TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$landingEl = options.$landingEl;
    this.$mainEl = options.$mainEl;
    // this.$leftMainEl = options.$leftMainEl;
    // this.$rightMainEl = options.$rightMainEl;
    this.workspaces = options.workspaces;
    // window.testingSpace = this.workspaces;
  },

  routes: {
    "": "index",
    "workspaces/:id": "show",
    "workspaces/:workspaceId/user/:userId": "userTaskIndex",
    "workspaces/:workspaceId/project/:projectId": "projectTaskIndex"
    // "workspaces": "index"
  },

  index: function () {
    this.workspaces.fetch();
    var view = new TmUp.Views.WorkspacesIndex({
      collection: this.workspaces
    });
    this.currentMainView && this.currentMainView.remove();
    // this.currentLeftMainView && this.currentLeftMainView.remove();
    // this.currentRightMainView && this.currentRightMainView.remove();
    this._swapLandingView(view);
  },

  // createNewWorkspace: function () {
  //   modal = new TmUp.Views.NewWorkspaceForm({
  //     collection: this.workspaces,
  //     model: new TmUp.Models.Workspace()
  //   });
  //   $('body').append(modal.$el);
  //   modal.render();
  // },

  // root: function () {
  //   if (TmUp.checkCurrentUser()) {
  //     this.show(Cookies.get('current-workspace-id'));
  //   } else {
  //     this.workspaces.fetch({
  //       success: function (collection) {
  //         if (collection.length > 0) {
  //           this.show(collection.first().id);
  //           // $('.nav-current-workspace-title').html(collection.first().escape('title'));
  //         } else {
  //           this.createNewWorkspace();
  //         }
  //       }.bind(this)
  //     });
  //   }
  // },

  show: function (id) {
    var workspace = this.workspaces.getOrFetch(id);
    TmUp.CURRENT_WORKSPACE = parseInt(workspace.id);
    var WorkspacesShowView = new TmUp.Views.WorkspacesShow({
      model: workspace,
    });
    this.currentLandingView && this.currentLandingView.remove();
    this._swapMainView(WorkspacesShowView);
  },

  userTaskIndex: function (workspaceId, userId) {
    var workspace = this.workspaces.getOrFetch(workspaceId);
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
      }
    });
    // debugger
    this.currentLandingView && this.currentLandingView.remove();
  },

  projectTaskIndex: function (workspaceId, projectId) {
    var workspace = this.workspaces.getOrFetch(workspaceId);
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
    // debugger
    this.currentLandingView && this.currentLandingView.remove();
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
  },

  // _swapLeftMainView: function (view) {
  //   this.currentLeftMainView && this.currentLeftMainView.remove();
  //   this.currentLeftMainView = view;
  //   this.$leftMainEl.html(view.$el);
  //   view.render();
  // },
  //
  // _swapRightMainView: function (view) {
  //   this.currentRightMainView && this.currentRightMainView.remove();
  //   this.currentRightMainView = view;
  //   this.$rightMainEl.html(view.$el);
  //   view.render();
  // }

});
