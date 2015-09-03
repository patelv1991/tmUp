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
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.model, 'change', this.render);
  },

  events: {
    'click .delete-new-task': 'remove',
    'click .delete-task': 'deleteTask',
    'click .task-save-btn': 'saveTask',
    'dblclick .task-title-container': 'editTask',
    'click .bs-checkbox > input': 'completeTask',
    'shown.bs.dropdown div.dropdown': 'changeAssignee',
    'show .input-group.date': 'changeDate'
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
      var backgroundColor;
      var initials;
      if (selectedAssigneeId === undefined) {
        selectedAssigneeId = null;
        selectedAssignee = '_';
        backgroundColor = 'rgba(93, 86, 86, 0.14)';
        initials = "__";

        this.renderTemporaryChangesToScreen(
          initials, backgroundColor, selectedAssignee, selectedAssigneeId
        );
      } else {
        var selectedAssignee = this.workspace.workTeam().findWhere({
          id: selectedAssigneeId
        });
        backgroundColor = selectedAssignee.color;
        initials = selectedAssignee.escape('fname')[0].toUpperCase() +
                       selectedAssignee.escape('lname')[0].toUpperCase();

        this.renderTemporaryChangesToScreen(
          initials, backgroundColor, selectedAssignee, selectedAssigneeId
        );
      }
    }.bind(this));
  },

  renderTemporaryChangesToScreen: function (initials, backgroundColor, selectedAssignee, selectedAssigneeId) {
    this.$el.find('div.dropdown > button').text(initials);
    this.$el.find('div.dropdown > button').data('assignee-id', selectedAssigneeId);
    this.$el.find('div.dropdown > button').css({
      "background-color": backgroundColor
    });

    this.saveChangedAssignee(selectedAssignee, selectedAssigneeId);
  },

  saveChangedAssignee: function (selectedAssignee, selectedAssigneeId) {
    if (this.newTask) {
      // this allows this.selectedAssignee to be used later when creating a task
      this.selectedAssignee = selectedAssignee;
      return;
    } else {
      if (selectedAssigneeId != this.model.escape('assignee_id')) {
        this.model.save({ assignee_id: selectedAssigneeId }, {
          success: function (task) {
            // this.newTask = false;
            // debugger
            if (this.project === undefined) {
              this.collection.remove(this.model, { merge: true });
              this.remove();
            }
          }.bind(this),
        });
      }
    }
  },

  changeDate: function () {
    if (!this.newTask) {
      this.$el.find('.input-group.date').on('changeDate', function (event) {
        var selectedDate = this.$el.find('td.task-calendar').datepicker('getUTCDate');
        this.model.save({ due_date: selectedDate });
      }.bind(this));
    }
  },

  findProject: function () {
    // debugger
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

  getProjectId: function () {
    // debugger
    if (this.newTask) {
      return this.project.id;
    } else {
      return this.model.escape('project_id');
    }
  },

  getTaskAssignee: function () {
    if (this.selectedAssignee === undefined) {
      return this.$el.find('div.dropdown > button').data('assignee-id');
    } else {
      return this.selectedAssignee.id;
    }
  },

  getFormDataForNewTask: function () {
    var formData = {
      title: this.$el.find('td.editable input').val(),
      due_date: this.$el.find('td.task-calendar').datepicker('getUTCDate'),
      creator_id: TmUp.CURRENT_USER.id,
      project_id: this.getProjectId(),
      assignee_id: this.getTaskAssignee()
    };

    return formData;
  },

  saveTask: function (event) {
    event.preventDefault();
    var formData = this.getFormDataForNewTask();
    this.model.save(formData, {
      success: function (task) {
        // this.newTask = false;
          this.collection.add(task, { merge: true }, { remove: true });
        if (this.newTask) {
          this.remove();
        } else {
          this.$el.find('.task-title.editable').toggleClass('currently-being-edited');
          this.$el.find('.task-title div.task-title-container').toggleClass('hiding');
          this.$el.find('.task-title > div.container').toggleClass('hiding');
        }
        // this.stopListening();
      }.bind(this),
    });
  },

  editTask: function (event) {
    // debugger
    // this.events['dblclick .editable'] = undefined;
    // this.delegateEvents(this.events);
    // $('.editable').off('dblclick');
    event.preventDefault();
    this.$el.find('.task-title.editable').toggleClass('currently-being-edited');
    this.$el.find('.task-title > div.container').toggleClass('hiding');
    this.$el.find('.task-title div.task-title-container').toggleClass('hiding');
    $('#new-task').select();
  },

  completeTask: function (event) {
    this.model.save({ completed: (!this.model.get('completed')) }, {
      success: function (task) {
        if (task.get('completed')) {
          this.remove();
        }
      }.bind(this)
    });
  },

  deleteTask: function (event) {
    event.preventDefault();
    var taskId = $(event.currentTarget).data('index');
    this.model.destroy({
      success: function (task) {
        // this.collection.remove(task);
        this.remove();
      }.bind(this)
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

  isPastDue: function (dueDate) {
    // dueDate = this.model.get('due_date');
    currentDay = new Date().getDate().toString();
    currentDay = currentDay.length === 1 ? '0' + currentDay : currentDay;
    currentMonth = (new Date().getMonth() + 1).toString();
    currentMonth = currentMonth.length === 1 ? '0' + currentMonth : currentMonth;
    currentYear = new Date().getFullYear().toString();
    currentDate = currentYear + '-' + currentMonth + '-' + currentDay;
    if (dueDate < currentDate) {
      this.$el.find('td.task-calendar div input').addClass('past-due');
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

    this.isPastDue(this.model.get('due_date')); // Renders tasks that are past due in red

    if (this.newTask) {
      this.$el.find('td.delete-task').addClass('delete-new-task');
      this.$el.find('.task-title').addClass('new-task-cell');
      this.$el.find('.task-title > div.container').toggleClass('hiding');
      this.$el.find('.task-title div.task-title-container').toggleClass('hiding');
      $('.task-title > div.container input#new-task').focus();
    }
    return this;
  },
});
