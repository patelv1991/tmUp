TmUp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  // tagName: 'tr',

  initialize: function (options) {
    this.$el = $('<tr data-index=' + this.model.id + '></tr>');
    this.project = options.project;
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

  // editTask: function (event) {
  //   event.preventDefault();
  //   var title = $(event.currentTarget).text().trim();
  //   var taskIndex = $(event.currentTarget).data('index');
  //   var due_date = $('.input-group.date[data-index="' + taskIndex + '"]').datepicker('getDate');
  //   var project_id = $('tr td.project[data-index="' + taskIndex + '"]').data('project-id');
  //   var assignee_id = $('td.task-dropdown div button[data-index="' + taskIndex + '"]').data('assignee-id');
  //   var creator_id = TmUp.CURRENT_USER.id; // don't need this for editing a task
  //   debugger
  //
  //
  //   var view = new TmUp.Views.TaskIndexItem({
  //     workspace: this.workspace,
  //
  //   });
  // },

  getFormDataForNewTask: function () {
    var formData = {
      title: this.$el.find('td.editable input').val(),
      due_date: this.$el.find('td.task-calendar').datepicker('getUTCDate'),
      creator_id: TmUp.CURRENT_USER.id,
      project_id: this.project.id
    };

    return formData;
  },

  editTask: function (event) {
    event.preventDefault();
    debugger
  },

  saveTask: function (event) {
    event.preventDefault();
    var formData = this.getFormDataForNewTask();
    this.model.save(formData, {
      success: function (task) {
        this.newTask = false;
        this.remove();
        this.collection.add(task, { merge: true }, { remove: true });
        // this.stopListening();
        // this.$el.find('.task-title div.task-title-container').toggleClass('hiding');
        // this.$el.find('.task-title > div.container').toggleClass('hiding');
      }.bind(this),
    });
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
      this.$el.find('.task-title > div.container').toggleClass('hiding');
      this.$el.find('.task-title div.task-title-container').toggleClass('hiding');
      this.onRender();
    }
    return this;
  },

  onRender: function () {
    $('#new-task').focus();
  }
});
