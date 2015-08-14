TmUp.Views.TeamIndexItem = Backbone.View.extend({
  template: JST['teams/index_item'],

  render: function () {
    var content = this.template({ team_member: this.model });
    this.$el.html(content);
    return this;
  }
});
