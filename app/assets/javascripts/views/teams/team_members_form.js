TmUp.Views.TeamMemberForm = Backbone.View.extend({
  template: JST['teams/form'],

  events: {
    'submit form': 'inviteMembers',
    'click .m-background': 'removeBtn',
    'click .close': 'removeBtn',
    'focusout #work-team': 'validateEmails',
    'input #work-team': 'validateEmails',
    'mouseleave #work-team': 'validateEmails',
    'focus #work-team': 'removeEmailError',
    'mouseenter #work-team': 'removeEmailError',
    'click .btn-danger': 'removeFromWorkspace'
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

  validateEmails: function (event) {
    // Removes error messages from the view if they exist
    this.$el.find('.alert-danger') && event.type === "input" &&
              this.$el.find('.alert').remove();

    // validates entered email(s)
    var emails = $('textarea#work-team').serializeJSON();
    if (emails.user.emails === "") {
      this.disableButton('button.btn-default');
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
        this.parsedEmails.push(email);
        this.removeEmailError('form div.form-group:first-child');
        this.enableButton('button.btn-default');
      } else {
        this.addEmailError('form div.form-group:first-child');
        this.disableButton('button.btn-default');
        return;
      }
    }.bind(this));
  },

  inviteMembers: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON().user;
    this.findUsersAndCreateCollection(formData);
  },

  findUsersAndCreateCollection: function () {
    emails = this.parsedEmails;
    users = new TmUp.Collections.WorkTeam();
    users.fetch({
      data: { emails: emails },
      success: function (users) {
        this.usersFound (users);
      }.bind(this),

      error: function (users, serverResp) {
        this.noUsersFoundError(users, serverResp);
      }.bind(this)
    });
  },

  usersFound: function (users) {
    var workspaceMemberships = new TmUp.Collections.workspaceMemberships();
    users.forEach(function (user) {
      var workspaceMembership = new TmUp.Models.workspaceMembership({
        user_id: user.id,
        workspace_id: workspace.id
      });
      workspaceMemberships.add(workspaceMembership);
    });

    this.saveWorkspaceMemberships(this, workspaceMemberships);
  },

  saveWorkspaceMemberships: function (that, objects) {
    Backbone.sync('create', objects, {
      success: function () {
        users.forEach(function (user) {
          that.collection.add(user);
        });
        that.remove();
      },

      error: function (serverResp) {
        this.usersAlreadyInWorkspaceError(serverResp);
      }.bind(this)
    });
  },

  noUsersFoundError: function (users, serverResp) {
    if (serverResp.status === 422 && this.$el.find(".alert-danger").length === 0) {
      var $errorDiv = $('<div class="alert alert-danger" role="alert">');
      var failedEmails = serverResp.responseJSON.join(", ");
      $errorDiv.append("<p><strong>" + failedEmails + "</strong> could " +
                       "not be found. Please ensure that user(s) have" +
                       "TmUp account(s). </p>");
      $errorDiv.append("<p>Try using <strong>example@example.com</strong>" +
                       " for testing purposes.</p>");
      this.$el.find('form').prepend($errorDiv);
    }
  },

  usersAlreadyInWorkspaceError: function (serverResp) {
    if (serverResp.status === 422 && this.$el.find(".alert-warning").length === 0) {
      var $errorDiv = $('<div class="alert alert-warning" role="alert">');
      var failedEmails = serverResp.responseJSON.join(", ");
      if (serverResp.responseJSON.length === 1) {
        $errorDiv.append("<p>" + failedEmails + " is already in your " +
                         "workspace. </p>");
      } else {
        $errorDiv.append("<p>" + failedEmails + " are already in your " +
                         "workspace. </p>");
      }
      this.$el.find('form').prepend($errorDiv);
    }
  },

  removeFromWorkspace: function (event) {
    event.preventDefault();

    var workspaceId = $(event.currentTarget).data('workspace-id');
    var userId = $(event.currentTarget).data('user-id');
});
  },

  render: function () {
    this.$el.html(this.template({ workspace: workspace }));
    this.renderTeamMembers();
    this.onRender();
    return this;
  },

  renderTeamMembers: function () {
    this.collection.forEach(function (member) {
      var $tr = $('<tr>');
      var $firstTd = $('<td>');
      var $secondTd = $('<td>');
      var $thirdTd = $('<td><button type="button" class="btn btn-xs btn-danger">Remove</button></td>');
      $thirdTd.data('member-id', member.id);
      $thirdTd.data('workspace-id', workspace.id);
      $tr.append($firstTd.html(member.escape('fname') + " " + member.escape('lname')));
      $tr.append($secondTd.html(member.escape('email')));
      $tr.append($thirdTd);

      this.$el.find('table').append($tr);
    }.bind(this));
  },

  onRender: function () {
    $('#workspace-team').focus();
  },

  removeEmailError: function (selector) {
    this.$el.find(selector).removeClass('has-error');
  },

  addEmailError: function (selector) {
    this.$el.find(selector).addClass('has-error');
  },

  disableButton: function (selector) {
    this.$el.find(selector).prop('disabled', true);
  },

  enableButton: function (selector) {
    this.$el.find(selector).prop('disabled', false);
  }
});
