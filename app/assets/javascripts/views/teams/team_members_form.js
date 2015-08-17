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

  validateEmails: function (event) {
    var emails = $('textarea#work-team').serializeJSON();
    if (emails.user.emails === "") {
      this.enableButton('button.btn-default');
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
        this.enableButton('button.btn-default')
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
    users.forEach(function (user) {
      debugger
    });
    // var model = new TmUp.Models.TeamMember();
    //
    // this.model.save(formData, {
    //   success: function (project) {
    //     this.collection.add(project);
    //     this.remove();
    //     var route = '/workspaces/' + project.id;
    //     Backbone.history.navigate(route, { trigger: true });
    //   }.bind(this)
    // });
  },

  findUsersAndCreateCollection: function () {
    emails = this.parsedEmails;
    users = new TmUp.Collections.WorkTeam();
    var that = this;
    users.fetch({
      data: { emails: emails },
      success: function (users) {
        this.newMembers = users;
      }.bind(this)
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
