TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$landingEl = options.$landingEl;
    this.$sideEl = options.$sideEl;
    this.$leftMainEl = options.$leftMainEl;
    this.$rightMainEl = options.$rightMainEl;
    this.workspaces = options.workspaces;
    window.testingSpace = this.workspaces;
  },

  routes: {
    "": "index",
    "workspaces/:id": "show",
    // "workspaces": "index"
  },

  index: function () {
    this.workspaces.fetch();
    var view = new TmUp.Views.WorkspacesIndex({
      collection: this.workspaces
    });
    this.currentSideView && this.currentSideView.remove();
    this.currentLeftMainView && this.currentLeftMainView.remove();
    this.currentRightMainView && this.currentRightMainView.remove();
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
    this._swapSideView(WorkspacesShowView);
  },

  _swapLandingView: function (view) {
    this.currentLandingView && this.currentLandingView.remove();
    this.currentLandingView = view;
    this.$sideEl.html(view.$el);
    view.render();
  },

  _swapSideView: function (view) {
    this.currentSideView && this.currentSideView.remove();
    this.currentSideView = view;
    this.$sideEl.html(view.$el);
    view.render();
  },

  _swapLeftMainView: function (view) {
    this.currentLeftMainView && this.currentLeftMainView.remove();
    this.currentLeftMainView = view;
    this.$leftMainEl.html(view.$el);
    view.render();
  },

  _swapRightMainView: function (view) {
    this.currentRightMainView && this.currentRightMainView.remove();
    this.currentRightMainView = view;
    this.$rightMainEl.html(view.$el);
    view.render();
  }

});
