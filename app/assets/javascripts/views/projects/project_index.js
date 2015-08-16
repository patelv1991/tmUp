TmUp.Views.ProjectIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function () {
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
      model: project
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
    modal = new TmUp.Views.NewProjectForm({
      collection: this.collection,
<<<<<<< HEAD
      model: new TmUp.Models.Project({ workspace: this.workspace })
=======
      model: new TmUp.Models.Project()
>>>>>>> 944a1f30fbb11a63c2936f79108cfd9e5dac619e
    });
    $('body').append(modal.$el);
    modal.render();
  },

});
