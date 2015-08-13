TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    return this;
  }
});
