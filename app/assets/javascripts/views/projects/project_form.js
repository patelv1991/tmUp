TmUp.Views.ProjectForm = Backbone.View.extend({
  templateNew: JST['projects/new_form'],
  templateUpdate: JST['projects/edit_form'],

  events: {
    'submit form': 'submitAction',
    'input #project-title': 'enableSubmitButton',
    'click .m-background': 'removeBtn',
    'click .close': 'removeBtn'
  },

  initialize: function (options) {
    $(document).on('keyup', this.handleKey.bind(this));
    this.editting = options.editting;
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
    this.$el.find('.m-content .alert-danger').addClass('hidden');
    var inputLength = $(event.currentTarget).serializeJSON().project.title.length;
    if (inputLength > 0) {
      this.$el.find('button.btn-default').prop('disabled', false);
    } else {
      this.$el.find('button.btn-default').prop('disabled', true);
    }
  },

  submitAction: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    formData.project['workspace_id'] = TmUp.CURRENT_WORKSPACE;
    formData.project['owner_id'] = TmUp.CURRENT_USER.id;
    this.model.save(formData, {
      success: function (project) {
        this.collection.add(project, { merge: true });
        this.remove();
        $('.glyphicon-plus').prop('disabled', false);
        var route = '#/workspaces/' + project.escape('workspace_id') +
                    '/project/' + project.id;
        Backbone.history.navigate(route, { trigger: true });
      }.bind(this),

      error: function (project) {
        var $alert = this.$el.find('.m-content .alert-danger');
        $alert.html('Project with entered name already exists. Please change the name.');
        $alert.removeClass('hidden');
      }.bind(this)
    });
  },

  render: function () {
    if (this.editting) {
      this.$el.html(this.templateUpdate({ project: this.model }));
    } else {
      this.$el.html(this.templateNew({ project: this.model }));
    }
    this.editting && this.$el.find('button.btn-default').prop('disabled', false);
    this.onRender();
    return this;
  },

  onRender: function () {
    $('#project-title').select();
  }
});
