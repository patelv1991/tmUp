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
    this.workspaces.fetch({
      success: function (collection) {
        var workspace = collection.getActiveWorkspace();
        var route = '/workspace/' + workspace.id;
        Backbone.history.navigate(route, { trigger: true });
      }
    });

    // this._workspaces = new TmUp.Views.WorkspacesIndex({
    //   collection: this.workspaces
    // });
    // this._workspaces.fetchWorkspaces(callback);
    // var workspace = this.workspaces.getActiveWorkspace();
    // debugger;

    //
    // var WorkspacesIndexView = new TmUp.Views.WorkspacesIndex({
    //   collection: this.workspaces
    // });
    //
    // this._swapView(WorkspacesIndexView);
  },

  show: function (id) {
    // if (this._workspaces === undefined) {
    //   this.index(this.show.bind(this, id, callback));
    //   return;
    // }
    this.workspaces.fetch({
      success: function () {
        var previouslyActiveWorkspace = this.workspaces.getActiveWorkspace();
        // debugger
        if (previouslyActiveWorkspace && previouslyActiveWorkspace.id != id) {
          previouslyActiveWorkspace.save({ active: null });
        }
      }.bind(this)
    });

    var workspace = this.workspaces.getOrFetch(id);
    workspace && workspace.save({ active: true });

    var WorkspacesShowView = new TmUp.Views.WorkspacesShow({
      model: workspace,
      collection: this.workspaces
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
