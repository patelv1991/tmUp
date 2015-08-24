TmUp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  tagName: 'tr',

  initialize: function (options) {
    this.workspace = options.workspace;
  },

  render: function () {
    var content = this.template({
      task: this.model,
      workspace: this.workspace
    });
    this.$el.html(content);
    return this;
  }
});
