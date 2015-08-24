TmUp.Views.NavShow = Backbone.View.extend({
  template: JST['nav/nav_bar'],

  initialize: function (options) {
    this.workspaces = this.collection.fetch();
    this.router = options.router;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addRandomColorToInitials);
    // this.listenTo(this.collection, 'sync', this.renderActiveWorkspaceTitle);
    this.listenTo(this.router, "route", this.getRouteNameAndParams);
  },

  events: {
    'click .log-out':'logOut',
    'click .new-workspace': 'createNewWorkspace',
    'click .menu-toggle': 'handleToggle',
  },

  ActiveWorkspaceTitle: function (workspace) {
      this._workspaceTitle = workspace.escape('title');
  },

  getRouteNameAndParams: function (routeName, params) {
    if (params[0] == this._workspaceId) { return; }
    this._routeName = routeName;
    this._workspaceId = parseInt(params[0]);
    if (routeName === "index") {
      this.removeSidebarButton();
    } else if (params[0] !== null && routeName !== "index") {
      this.collection.getOrFetch(params[0], this.ActiveWorkspaceTitle.bind(this));
    }
  },

  removeSidebarButton: function () {
    this.$el.find('#toggle-close').addClass('hidden');
    this.$el.find('#toggle-open').addClass('hidden');
    // $('.navbar').removeClass('toggled-sidebar');
  },

  renderSbButtonToOpen: function () {
    this.$el.find('#toggle-close').addClass('hidden');
    this.$el.find('#toggle-open').removeClass('hidden');
    // this handles box-shadow for navbar when sidebar is hidden
    $('.navbar').removeClass('toggled-sidebar');
    // this handles size of task index container when sidebar is hidden
    $('#tasks-index-container').removeClass('sidebar-toggled');
  },

  renderSbButtonToClose: function () {
    if (this._routeName !== "index" && this._routeName !== undefined) {
      this.$el.find('#toggle-close').removeClass('hidden');
      this.$el.find('#toggle-open').addClass('hidden');
      // this handles box-shadow for navbar when sidebar is toggled
      $('.navbar').addClass('toggled-sidebar');
      // this handles size of task index container when sidebar is toggled
      $('#tasks-index-container').addClass('sidebar-toggled');
    }
  },

  handleToggle: function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");

    var dataTag = this.$el.find('.hidden').data('toggle');
    (dataTag === "closed") ? this.renderSbButtonToOpen() : this.renderSbButtonToClose();
  },
  // handleRoute: function (routeName, params) {
  //   debugger
  //   if (params[0] !== null) {
  //     this.workspaceId = parseInt(params[0]);
  //   }
  //   this.$el.find(".active").removeClass("active");
  //   this.$el.find("." + routeName).addClass("active");
  // },

  logOut: function (event) {
    $.ajax({
      url: "/session",
      type: 'POST',
      data: {_method: 'delete'},
      success: function (html, status, object) {
        window.location = "session/new";
        Cookies.set('last-logged-in-user', TmUp.CURRENT_USER.id);
      }
    });
  },

  createNewWorkspace: function () {
    modal = new TmUp.Views.NewWorkspaceForm({
      collection: this.collection,
      model: new TmUp.Models.Workspace()
    });
    $('body').append(modal.$el);
    modal.render();
  },

  render: function () {
    var content = this.template({
      workspaces: this.collection
    });
    this.$el.html(content);
    this.renderSbButtonToClose();
    this.renderActiveWorkspaceTitle();
    // this.addRandomColorToInitials();
    return this;
  },

  renderActiveWorkspaceTitle: function () {
    this.$('.nav-current-workspace-title').html(this._workspaceTitle);
  },

  addRandomColorToInitials: function () {
    var workspace = this.collection.get(this._workspaceId);

    if (workspace) {
      var user = workspace.workTeam().findWhere({ id: TmUp.CURRENT_USER.id });
      if (user) {
        var randomColor = user.color;
        this.$('.user-initials').css({"background-color": randomColor});
      }
    } else {
      this.$('.user-initials').css({"background-color": "#E18303" });
    }

  }
  // renderActiveWorkspaceTitle: function () {
  //   if (this.collection.length > 0) {
  //     this.$('.nav-current-workspace-title').html(Cookies.get('current-workspace-title'));
  //   }
  // }

});
