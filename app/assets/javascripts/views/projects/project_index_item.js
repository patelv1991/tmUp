TmUp.Views.ProjectIndexItem = Backbone.View.extend({
  template: JST['projects/index_item'],

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    return this;
  }
});
