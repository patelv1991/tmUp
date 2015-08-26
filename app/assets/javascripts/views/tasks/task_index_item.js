TmUp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  // tagName: 'tr',

  initialize: function (options) {
    this.$el = $('<tr data-index=' + this.model.id + '></tr>');
    this.workspace = options.workspace;
    this.newTask = options.newTask;
    this.edittingTask = options.edittingTask;
    this.renderingAllTasks = options.renderingAllTasks;
  },

  events: {
    'click .delete-new-task': 'remove',
    'click .glyphicon-floppy-disk': 'saveTask',
    'dblclick .editable': 'editTask'
  },

  findAssignee: function () {
    var assigneeId = parseInt(this.model.escape('assignee_id'));
    var assignee = this.workspace.workTeam().findWhere({ id: assigneeId });
    if (assignee === undefined) {
      this.assigneeColor = 'rgba(93, 86, 86, 0.14)';
      return '__';
    } else {
      this.assigneeColor = assignee.color;
      return assignee;
    }
  },

  findProject: function () {
    if (!this.renderingAllTasks) {
      return "";
    } else {
      var projectId = parseInt(this.model.escape('project_id'));
      var project = this.workspace.projects().findWhere({ id: projectId });
      return project;
    }
  },

  editTask: function (event) {
    event.preventDefault();
    debugger
  },

  saveTask: function (event) {
    event.preventDefault();
    debugger
  },

  render: function () {
    var content = this.template({
      task: this.model,
      workspace: this.workspace,
      assignee: this.findAssignee(),
      randomColor: this.assigneeColor,
      project: this.findProject(),
      newTask: this.newTask,
      edittingTask: this.edittingTask
    });
    this.$el.html(content);

    if (this.newTask) {
      this.$el.find('.glyphicon-trash').addClass('delete-new-task');
      this.$el.find('.task-title').addClass('new-task-cell');
      this.onRender();
    }
    return this;
  },

  onRender: function () {
    $('#new-task').focus();
  }
});
