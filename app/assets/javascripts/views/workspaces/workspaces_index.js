TmUp.Views.WorkspacesIndex = Backbone.View.extend({
  template: JST['workspaces/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  events: {
    'click .new-workspace': "createNewWorkspace"
  },

  render: function () {
    var content = this.template({ workspaces: this.collection });
    this.$el.html(content);
    return this;
  },

  createNewWorkspace: function () {
    modal = new TmUp.Views.NewWorkspaceForm({
      collection: this.collection,
      model: new TmUp.Models.Workspace()
    });
    $('body').append(modal.$el);
    modal.render();
  }

  // fetchWorkspaces: function (callback) {
  //   this.collection.fetch({ success: function () {
  //     callback && callback();
  //   }});
  // }
});
