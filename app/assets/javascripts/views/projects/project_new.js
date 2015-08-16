TmUp.Views.NewProjectForm = Backbone.View.extend({
  template: JST['projects/form'],

  events: {
    'submit form': 'createNewProject',
    'input #project-title': 'enableSubmitButton',
    'click .m-background': 'removeBtn',
    'click .close': 'removeBtn'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
<<<<<<< HEAD
    // this.model.set({
    //   workspace_id: TmUp.CURRENT_WORKSPACE,
    //   owner_id: TmUp.CURRENT_USER.id
    // });
=======
>>>>>>> 944a1f30fbb11a63c2936f79108cfd9e5dac619e
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
      $('.glyphicon-plus').prop('disabled', false);
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
    $('.glyphicon-plus').prop('disabled', false);
  },

  enableSubmitButton: function (event) {
    var inputLength = $(event.currentTarget).serializeJSON().project.title.length;
    if (inputLength > 0) {
      this.$el.find('button.btn-default').prop('disabled', false);
    } else {
      this.$el.find('button.btn-default').prop('disabled', true);
    }
  },

  createNewProject: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
<<<<<<< HEAD
    formData.project['workspace_id'] = TmUp.CURRENT_WORKSPACE;
    formData.project['owner_id'] = TmUp.CURRENT_USER.id;
=======
>>>>>>> 944a1f30fbb11a63c2936f79108cfd9e5dac619e
    this.model.save(formData, {
      success: function (project) {
        this.collection.add(project);
        this.remove();
        $('.glyphicon-plus').prop('disabled', false);
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template());
    this.onRender();
    return this;
  },

  onRender: function () {
    $('#project-title').focus();
  }
});
