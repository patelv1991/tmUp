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
    this.workspaces.fetch();

    var WorkspacesIndexView = new TmUp.Views.WorkspacesIndex({
      collection: this.workspaces
    });

    this._swapView(WorkspacesIndexView);
  },

  show: function (id) {
    this.workspaces.fetch({
      success: function () {
        var previouslyActiveWorkspace = this.workspaces.getActiveWorkspace();
        if (previouslyActiveWorkspace.length > 0) {
          previouslyActiveWorkspace[0].save({ active: null });
        }
      }.bind(this)
    });

    var workspace = this.workspaces.getOrFetch(id);
    workspace && workspace.save({ active: true });

    var WorkspacesShowView = new TmUp.Views.WorkspacesShow({
      model: workspace
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
