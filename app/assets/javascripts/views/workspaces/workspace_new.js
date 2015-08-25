TmUp.Views.NewWorkspaceForm = Backbone.View.extend({
  template: JST['workspaces/form'],

  events: {
    'submit form': 'initiateNewWorkspaceEvent',
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
    // this.listenTo(this.collection, 'sync', this.render);
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

  initiateNewWorkspaceEvent: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    this.checkUsersExistance(formData);
  },

  checkUsersExistance: function (formData) {
    var emails = this.parsedEmails;
    if (emails === undefined || emails.length === 0) {
      this.createNewWorkspace([], formData);
    } else {
      users = new TmUp.Collections.WorkTeam();
      users.fetch({
        data: { emails: emails },
        success: function (users) {
          this.createNewWorkspace(emails, formData);
        }.bind(this),

        error: function (users, serverResp) {
          this.noUsersFoundError(users, serverResp);
          this._usersExists = false;
        }.bind(this)
      });
    }
  },

  createNewWorkspace: function (emails, formData) {
    if (_.includes(emails, TmUp.CURRENT_USER.email)) {
      this.throwSelfEmailError();
      this.parsedEmails = [];
    } else {
      this.model.save(formData, {
        success: function (workspace) {
          this.collection.add(workspace);
          this.remove();
          var route = '/workspaces/' + workspace.id;
          Backbone.history.navigate(route, { trigger: true });
        }.bind(this)
      });
    }
  },

  noUsersFoundError: function (users, serverResp) {
    if (serverResp.status === 422 && this.$el.find(".alert-danger").length === 0) {
      var $errorDiv = $('<div class="alert alert-danger" role="alert">');
      var failedEmails = serverResp.responseJSON.join(", ");

      if (serverResp.responseJSON.length === 1) {
        $errorDiv.append("<p><strong>" + failedEmails + "</strong> could " +
                         "not be found. Please make sure that user has " +
                         "TmUp account. </p>");
      } else if (serverResp.responseJSON.length > 1) {
        $errorDiv.append("<p><strong>" + failedEmails + "</strong> could " +
                         "not be found. Please make sure that each user has a " +
                         "TmUp account. </p>");
      }

      $errorDiv.append("<p>Try using <strong>example@example.com</strong>" +
                       " for testing purposes.</p>");
      this.$el.find('form').prepend($errorDiv);
    }
  },

  validateEmails: function (event) {
    this.$el.find('.alert') && event.type === "input" &&
              this.$el.find('.alert').remove();
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
        // this.checkForSelfEmail(email);
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

  checkForSelfEmail: function (email) {
    if (email === TmUp.CURRENT_USER.email) {
      this.throwSelfEmailError();
    }
  },

  throwSelfEmailError: function () {
    this.$el.find('textarea').val("");
    this.$el.find('.alert-warning').remove();
    var $errorDiv = $('<div class="alert alert-warning" role="alert">');
    $errorDiv.append("<p> You don't need to include your own email.</p>");
    this.$el.find('form').prepend($errorDiv);
    // this.parsedEmails = [];
  },

  removeEmailError: function () {
    this.$el.find('form div.form-group:nth-child(2)').removeClass('has-error');
  },

  render: function () {

    // this.enableButton('button.btn-default');
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
