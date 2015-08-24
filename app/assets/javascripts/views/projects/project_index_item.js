TmUp.Views.ProjectIndexItem = Backbone.View.extend({
  template: JST['projects/index_item'],
  tagName: 'li',

  initialize: function (options) {
      this.workspaceId = options.workspace.id;
  },

  render: function () {
    var content = this.template({
      project: this.model,
      workspaceId: this.workspaceId
    });
    this.$el.html(content);
    return this;
  }
});
