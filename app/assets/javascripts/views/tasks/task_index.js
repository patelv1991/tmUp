TmUp.Views.TaskIndex = Backbone.CompositeView.extend({
  template: JST['tasks/index'],

  initialize: function (options) {
    // if (options.user) {
      this.user = options.user;
    // }
    this.workspace = options.workspace;
    this.project = options.project;
    // this.listenTo(this.user, 'sync', this.render);
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
      workspace: this.workspace,
      header: this.renderHeader()
    }));
    this.attachSubviews();
    return this;
  },

  renderHeader: function () {
    var name;
    if (this.project) {
      name = this.project.escape('title') + "'s Tasks";
      return name;
    }

    if (this.user) {
      name = this.user.escape('fname') + "'s " + this.workspace.escape('title') + " Tasks";
      return name;
    } else {
      name = TmUp.CURRENT_USER.fname + "'s " + this.workspace.escape('title') + " Tasks";
      return name;
    }
  }
});
