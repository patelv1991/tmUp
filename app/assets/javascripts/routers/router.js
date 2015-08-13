TmUp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = options.workspaces;
  },

  routes: {
    "": "index"
  },

  index: function () {
    this.collection.fetch();

    var WorkspacesIndexView = new TmUp.Views.WorkspacesIndex({
      collection: this.collection
    });

    this._swapView(WorkspacesIndexView);
  },

  _swapView: function (view) {
    this.currentView && this.currentView.remove();
    this.currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }

});
