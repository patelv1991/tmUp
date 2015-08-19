TmUp.Collections.Workspaces = Backbone.Collection.extend({
  url: 'api/workspaces',
  model: TmUp.Models.Workspace,

  getOrFetch: function (id) {
    var collection = this;
    var workspace = collection.get(id);

    if (workspace) {
      workspace.fetch();
    } else {
      workspace = new collection.model({ id: id });
      collection.add(workspace);
      workspace.fetch({
        error: function () { collection.remove(workspace); }
      });
    }
    return workspace;
  }
});

// TmUp.Collection.workspaces = new TmUp.Collections.Workspaces
