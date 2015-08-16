TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.workspaces = options.workspaces;
  },

  routes: {
    "": "index",
    "workspaces/:id": "show"
  },

  index: function () {
    if (Cookies.get('current-workspace-id')) {
      this.show(Cookies.get('current-workspace-id'));
    } else {
      this.workspaces.fetch({
        success: function (collection) {
          if (collection.length > 0) {
            this.show(collection.first().id);
          } else {
            // this.createNewWorkspace();
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
