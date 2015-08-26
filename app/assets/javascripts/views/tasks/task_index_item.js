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
    'click .task-save-btn': 'saveTask',
    'dblclick .editable': 'editTask',
    'shown.bs.dropdown div.dropdown': 'changeAssignee'
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

  changeAssignee: function () {
    this.$el.find('.dropdown-menu').on('click', function (event) {
      var selectedAssigneeId = $(event.target).data('team-member-id');
      var selectedAssignee = this.workspace.workTeam().findWhere({
        id: selectedAssigneeId
      });
      var backgroundColor = selectedAssignee.color;
      var initials = selectedAssignee.escape('fname')[0].toUpperCase() +
                     selectedAssignee.escape('lname')[0].toUpperCase();
      this.$el.find('div.dropdown > button').text(initials);
      this.$el.find('div.dropdown > button').css({
        "background-color": backgroundColor
      });

      if (this.newTask) {
        this.selectedAssignee = selectedAssignee;
        return;
      }
      debugger
    }.bind(this));
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
      project_id: this.project.id,
      assignee_id: this.selectedAssignee.id
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

  parsedDate: function () {
    if (this.model.escape('due_date')) {
      var date = this.model.escape('due_date').split("-");
      return date[1] + '/' + date[2] + '/' + date[0];
    } else {
      return;
    }
  },

  render: function () {
    var content = this.template({
      task: this.model,
      due_date: this.parsedDate(),
      workspace: this.workspace,
      assignee: this.findAssignee(),
      randomColor: this.assigneeColor,
      project: this.findProject(),
      newTask: this.newTask,
      edittingTask: this.edittingTask
    });
    this.$el.html(content);
    // $('td.task-calendar > div.date').datepicker('setDate', this.model.escape('due_date'));
    if (this.newTask) {
      this.$el.find('td.delete-task').addClass('delete-new-task');
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
