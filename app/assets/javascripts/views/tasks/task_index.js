TmUp.Views.TaskIndex = Backbone.CompositeView.extend({
  template: JST['tasks/index'],

  initialize: function (options) {
    this.user = options.user;
    this.workspace = options.workspace;
    this.project = options.project;
    this.renderingAllTasks = options.renderingAllTasks;
    // this.listenTo(this.user, 'sync', this.render);
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addTask);
    // This makes sure that project title is updated when project is updated
    if (this.project) {
      this.listenTo(this.project, 'change', this.render);
    }
    // debugger
    this.collection.each(function (task) {
      this.addTask(task);
    }.bind(this));
  },

  events: {
    'click .update-project': 'updateProject',
    'click .delete-project': 'destroyProject'
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

  destroyProject: function (event) {
    event.preventDefault();
    this.project.destroy({
      success: function (project) {
        this.collection.remove(project);
        var route = '#/workspaces/' + this.workspace.id;
        Backbone.history.navigate(route, { trigger: true });
      }.bind(this)
    });

  },

  render: function () {
    this.$el.html(this.template({
      workspace: this.workspace,
      header: this.renderHeader(),
    }));
    this.toggleButtons();
    this.attachSubviews();
    return this;
  },

  toggleButtons: function () {
    if (!this.renderingAllTasks) {
      var $buttons = $('<button type="button" class="btn btn-default btn-xs show-completed-tasks">Show Completed Tasks</button> ' +
      '<button type="button" class="btn btn-default btn-xs update-project">Edit Project</button> ' +
      '<button type="button" class="btn btn-danger btn-xs delete-project">Delete Project</button> ');
      this.$el.find('.button-space').html($buttons);
    } else {
      this.$el.find('.button-space').empty();
    }
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
