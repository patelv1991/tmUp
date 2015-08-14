TmUp.Views.WorkspacesIndex = Backbone.View.extend({
  template: JST['workspaces/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ workspaces: this.collection });
    this.$el.html(content);
    return this;
  },

  // fetchWorkspaces: function (callback) {
  //   this.collection.fetch({ success: function () {
  //     callback && callback();
  //   }});
  // }
});
