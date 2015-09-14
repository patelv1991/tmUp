TmUp.Collections.Workspaces = Backbone.Collection.extend({
  url: 'api/workspaces',
  model: TmUp.Models.Workspace,

  getOrFetch: function (id, callback) {
    var collection = this;
    var workspace = collection.get(id);

    if (workspace) {
      workspace.fetch({
        success: function (workspace) {
          callback && callback(workspace);
        }
      });
    } else {
      workspace = new collection.model({ id: id });
      collection.add(workspace);
      workspace.fetch({
        success: function (workspace) {
          callback && callback(workspace);
        },
        error: function () { collection.remove(workspace); }
      });
    }

    return workspace;
  }
});
