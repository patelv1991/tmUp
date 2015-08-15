TmUp.Views.ProjectIndex = Backbone.CompositeView.extend({
  template: JST['projects/index'],

  initialize: function () {
    this.listenTo(this.collection, 'add', this.addProject);
    this.listenTo(this.collection, 'sync add', this.render);

    this.collection.each(function (project) {
      this.addProject(project);
    }.bind(this));
  },

  addProject: function (project) {
    var view = new TmUp.Views.ProjectIndexItem({
      model: project
    });
    this.addSubview('.project-index-items', view);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },
});
