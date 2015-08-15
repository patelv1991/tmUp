TmUp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  tagName: 'li',
  
  render: function () {
    var content = this.template({ task: this.model });
    this.$el.html(content);
    return this;
  }
});
