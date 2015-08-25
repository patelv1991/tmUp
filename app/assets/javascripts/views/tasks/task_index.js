TmUp.Views.TaskIndex = Backbone.CompositeView.extend({
  template: JST['tasks/index'],

  initialize: function (options) {
    // debugger
    this.user = options.user;
    this.workspace = options.workspace;
    this.project = options.project;
    this.renderingAllTasks = options.renderingAllTasks;
    // this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addTask);
    // this.listenTo(this.project, 'change', this.render);
    this.collection.each(function (task) {
      this.addTask(task);
    }.bind(this));
  },

  events: {
    'click .update-project': 'updateProject'
  },

  addTask: function (task) {
    var view = new TmUp.Views.TaskIndexItem({
      workspace: this.workspace,
      model: task,
      renderingAllTasks: this.renderingAllTasks
    });
    this.addSubview('.tasks', view);
  },

  updateProject: function () {
    modal = new TmUp.Views.ProjectForm({
      collection: this.workspace.projects(),
      model: this.project,
      editting: true
    });
    $('body').append(modal.$el);
    modal.render();
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
