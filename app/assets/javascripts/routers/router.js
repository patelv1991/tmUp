TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.workspaces = options.workspaces;
  },

  routes: {
    "": "root",
    "workspaces/:id": "show",
    "workspaces": "index"
  },

  index: function () {
    this.workspaces.fetch();
      var view = new TmUp.Views.WorkspacesIndex({
        collection: this.workspaces
      });
    this._swapView(view);
  },

  createNewWorkspace: function () {
    modal = new TmUp.Views.NewWorkspaceForm({
      collection: this.workspaces,
      model: new TmUp.Models.Workspace()
    });
    $('body').append(modal.$el);
    modal.render();
  },

  root: function () {
    if (TmUp.checkCurrentUser()) {
      this.show(Cookies.get('current-workspace-id'));
    } else {
      this.workspaces.fetch({
        success: function (collection) {
          if (collection.length > 0) {
            this.show(collection.first().id);
            // $('.nav-current-workspace-title').html(collection.first().escape('title'));
          } else {
            this.createNewWorkspace();
          }
        }.bind(this)
      });
    }
  },

  show: function (id) {
    var workspace = this.workspaces.getOrFetch(id);
    TmUp.CURRENT_WORKSPACE = parseInt(workspace.id);
    var WorkspacesShowView = new TmUp.Views.WorkspacesShow({
      model: workspace,
    });
    this._swapView(WorkspacesShowView);
  },


  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
