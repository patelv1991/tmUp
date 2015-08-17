TmUp.Views.NewWorkspaceForm = Backbone.View.extend({
  template: JST['workspaces/form'],

  events: {
    'submit form': 'createNewWorkspace',
    'input #workspace-title': 'checkForTitle',
    'click .m-background': 'removeBtn',
    'click .close': 'removeBtn',
    // 'focus button.btn-default': 'validateEmails',
    'focusout #work-team': 'validateEmails',
    'input #work-team': 'validateEmails',
    'mouseleave #work-team': 'validateEmails',
    'focus #work-team': 'removeEmailError',
    'mouseenter #work-team': 'removeEmailError'
  },

  initialize: function () {
    $(document).on('keyup', this.handleKey.bind(this));
  },

  handleKey: function (event) {
    if (event.keyCode === 27) {
      this.remove();
    }
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
  },

  checkForTitle: function (event) {
    var inputLength = $('#workspace-title').serializeJSON().workspace.title.length;
    if (inputLength > 0) {
      this.enableButton('button.btn-default');
      this.$el.find('form div.form-group:first-child').removeClass('has-error');
      // this.removeEmailError();
      // this.$el.find('button.btn-default').prop('disabled', false);
    } else {
      this.disableButton('button.btn-default');
      this.$el.find('form div.form-group:first-child').addClass('has-error');

      // this.$el.find('button.btn-default').prop('disabled', true);
    }
  },

  createNewWorkspace: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();

    // formData.project['workspace_id'] = TmUp.CURRENT_WORKSPACE;
    // formData.project['owner_id'] = TmUp.CURRENT_USER.id;
    this.model.save(formData, {
      success: function (project) {
        this.collection.add(project);
        this.remove();
        var route = '/workspaces/' + project.id;
        Backbone.history.navigate(route, { trigger: true });
      }.bind(this)
    });
  },

  validateEmails: function (event) {
    var emails = $('textarea#work-team').serializeJSON();
    if (emails.user.emails === "") {
      if (event.type !== "mouseleave") {
        this.checkForTitle();
      }
      return;
    } else {
      this.parseEmails(emails.user.emails);
    }
  },

  parseEmails: function (emails) {
    emails = emails.split(",");
    this.parsedEmails = [];
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    emails.forEach(function (email) {
      email = email.trim();
      if (regex.test(email)) {
        this.parsedEmails.push(email.trim());
        this.checkForTitle();
        this.removeEmailError();
      } else {
        this.$el.find('form div.form-group:nth-child(2)').addClass('has-error');
        this.disableButton('button.btn-default');
        // this.$el.find('button.btn-default').prop('disabled', true);
        return;
      }
    }.bind(this));

  },

  removeEmailError: function () {
    this.$el.find('form div.form-group:nth-child(2)').removeClass('has-error');
  },

  render: function () {
    this.$el.html(this.template());
    this.onRender();
    return this;
  },

  onRender: function () {
    $('#workspace-title').focus();
  },

  disableButton: function (selector) {
    this.$el.find(selector).prop('disabled', true);
  },

  enableButton: function (selector) {
    this.$el.find(selector).prop('disabled', false);
  }
});
