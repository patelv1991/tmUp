TmUp.Views.WorkspacesShow = Backbone.CompositeView.extend({
  template: JST['workspaces/show'],

  initialize: function () {
    this.projects = this.model.projects();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.projects, 'add', this.addProject);
  },


  addProject: function (project) {
    var view = new TmUp.Views.ProjectIndexItem({
      model: project
    });
    this.addSubview('#projects', view);
  },

  render: function () {
    var content = this.template({ workspace: this.model });
    this.$el.html(content);
    this.renderProjects();
    return this;
  },

  renderProjects: function () {
    this.model.projects().each(this.addProject.bind(this));
  }
});
