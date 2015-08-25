TmUp.Views.ProjectIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function (options) {
    this.workspace = options.workspace;

    this.listenTo(this.collection, 'add', this.addProject);
    this.listenTo(this.collection, 'sync', this.render);

    this.collection.each(function (project) {
      this.addProject(project);
    }.bind(this));
  },

  events: {
    'click .glyphicon-plus': 'addNewProject'
  },

  addProject: function (project) {
    var view = new TmUp.Views.ProjectIndexItem({
      model: project,
      workspace: this.workspace
    });
    this.addSubview('.projects', view);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  addNewProject: function () {
    $('.glyphicon-plus').prop('disabled', true);
    modal = new TmUp.Views.ProjectForm({
      collection: this.collection,
      model: new TmUp.Models.Project()
    });
    $('body').append(modal.$el);
    modal.render();
  },

});
