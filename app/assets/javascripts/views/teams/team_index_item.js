TmUp.Views.TeamIndexItem = Backbone.View.extend({
  template: JST['teams/index_item'],
  tagName: 'li',

  initialize: function (options) {
    this.workspaceId = options.workspace.id;
    this.listenTo(this.model, 'remove', this.remove);
  },

  render: function () {
    var content = this.template({
      team_member: this.model,
      randomColor: this.model.color,
      workspaceId: this.workspaceId
    });
    this.$el.html(content);
    return this;
  },
});
