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

  initialize: function (options) {
    this.workspace = options.workspace;
    $(document).on('keyup', this.handleKey.bind(this));
    // this.listenTo(this.collection, 'remove', this.collection.fetch);
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
    var emails = this.parsedEmails;
    var users = new TmUp.Collections.WorkTeam();
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
        workspace_id: this.workspace.id
      });
      workspaceMemberships.add(workspaceMembership);
    }.bind(this));
    this.workspace.allMemberships().add(workspaceMemberships.models);
    this.saveWorkspaceMemberships(users, workspaceMemberships);
  },

  saveWorkspaceMemberships: function (users, objects) {
    Backbone.sync('create', objects, {
      success: function () {
        users.forEach(function (user) {
          this.workspace.workTeam().add(user);
          this.workspace.fetch();
          // that.collection.add(user);
        }.bind(this));
        this.remove();
      }.bind(this),

      error: function (serverResp) {
        this.usersAlreadyInWorkspaceError(serverResp);
      }.bind(this)
    });
  },

  noUsersFoundError: function (users, serverResp) {
    if (serverResp.status === 422 && this.$el.find(".alert-danger").length === 0) {
      var $errorDiv = $('<div class="alert alert-danger" role="alert">');
      var failedEmails = serverResp.responseJSON.join(", ");

      if (serverResp.responseJSON.length === 1) {
        $errorDiv.append("<p><strong>" + failedEmails + "</strong> could " +
                         "not be found. Please make sure that user has a " +
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

    var membership = this.workspace.allMemberships().findWhere({
      user_id: userId,
      workspace_id: workspaceId
    });
    var member = this.workspace.workTeam().findWhere({
      id: userId
    });

    // checks who is removed from the workspace. If it's the current user, then
    // sets route to true, which triggers navigation to workspace index page in
    // success callback of membership.destroy.
    var currentUser;
    if (this.checkUser(userId)) {
      currentUser = true;
    }

    membership.destroy({
      success: function () {
        this.workspace.workTeam().remove(member);
        this.workspace.allMemberships().remove(membership);
        this.$el.find('tr#' + userId).remove();
        this.navigateAwayFromThisPage(currentUser, member);
      }.bind(this)
    });
  },

  navigateAwayFromThisPage: function (currentUser, member) {
    currentRoute = Backbone.history.getFragment();
    routeUserId = currentRoute.match(/user\/(\d+)/);

    if (currentUser) {
      Backbone.history.navigate('', { trigger: true });
      this.remove();
    }

    if (routeUserId && routeUserId[1] == member.id) {
      var newRoute = currentRoute.split('/').splice(0,2).join('/');
      Backbone.history.navigate(newRoute, { trigger: true });
    }
  },

  checkUser: function (userId) {
    u = this.workspace.workTeam().findWhere({id: userId});
    return u.id == TmUp.CURRENT_USER.id;
  },

  render: function () {
    this.$el.html(this.template({ workspace: this.workspace }));
    this.renderTeamMembers();
    this.onRender();
    return this;
  },

  renderTeamMembers: function () {
    this.collection.forEach(function (member) {
      var $tr = $('<tr id=' + member.id + '></tr>');
      var $firstTd = $('<td>');
      var $secondTd = $('<td>');
      var $thirdTd;
      if (member.id === TmUp.CURRENT_USER.id) {
        $thirdTd = $('<td align="center"><button type="button" class="btn btn-xs ' +
                     'btn-danger" data-user-id=' + member.id +
                     ' data-workspace-id=' + this.workspace.id + '>Leave Workspace</button></td>');
      } else {
        $thirdTd = $('<td align="center"><button type="button" class="btn btn-xs ' +
                     'btn-danger" data-user-id=' + member.id +
                     ' data-workspace-id=' + this.workspace.id + '>Remove</button></td>');
      }
      $tr.append($firstTd.html(member.escape('fname') + " " + member.escape('lname')));
      $tr.append($secondTd.html(member.escape('email')));
      $tr.append($thirdTd);
      this.$el.find('table').append($tr);
    }.bind(this));
  },

  onRender: function () {
    $('#work-team').focus();
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
