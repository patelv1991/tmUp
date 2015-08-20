TmUp.Views.TaskIndex = Backbone.CompositeView.extend({
  template: JST['tasks/index'],

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addTask);

    this.collection.each(function (task) {
      this.addTask(task);
    }.bind(this));
  },

  addTask: function (task) {
    var view = new TmUp.Views.TaskIndexItem({
      model: task
    });
    this.addSubview('.tasks', view);
  },

  render: function () {
    this.$el.html(this.template({
      workspace: this.model,
      name: TmUp.CURRENT_USER.fname 
    }));
    this.attachSubviews();
    return this;
  }
});
