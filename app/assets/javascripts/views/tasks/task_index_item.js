TmUp.Views.TaskIndexItem = Backbone.View.extend({
  template: JST['tasks/index_item'],
  tagName: 'tr',

  initialize: function (options) {
    this.workspace = options.workspace;
    this.newTask = options.newTask;
    this.renderingAllTasks = options.renderingAllTasks;
  },

  renderAssignee: function () {
    var assigneeId = parseInt(this.model.escape('assignee_id'));
    var assignee = this.workspace.workTeam().findWhere({ id: assigneeId });
    if (assignee === undefined) {
      this.assigneeColor = 'rgba(93, 86, 86, 0.14)';
      return '__';
    } else {
      this.assigneeColor = assignee.color;
      return assignee.escape('fname')[0].toUpperCase() +
                  assignee.escape('lname')[0].toUpperCase();

    }
  },

  renderProjectName: function () {
    if (!this.renderingAllTasks) {
      return "";
    } else {
      var projectId = parseInt(this.model.escape('project_id'));
      var project = this.workspace.projects().findWhere({ id: projectId });
      return project.escape('title');
    }
  },

  render: function () {
    var content = this.template({
      task: this.model,
      workspace: this.workspace,
      assignment: this.renderAssignee(),
      randomColor: this.assigneeColor,
      projectName: this.renderProjectName()
    });
    this.$el.html(content);
    return this;
  }
});
