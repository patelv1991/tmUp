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
    'click .menu-toggle': 'handleToggle'
  },

  ActiveWorkspaceTitle: function (workspace) {
      this._workspaceTitle = workspace.escape('title');
  },

  getRouteNameAndParams: function (routeName, params) {
    if (params[0] == this._workspaceId) { return; }
    this._routeName = routeName;
    this._workspaceId = parseInt(params[0]);

    if (routeName === "show" && params[0] !== null) {
      this.collection.getOrFetch(params[0], this.ActiveWorkspaceTitle.bind(this));
    }
  },

  handleToggle: function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    // debugger
    var dataTag = this.$el.find('.hidden').data('toggle');
    if (dataTag === "open") {
      this.$el.find('#toggle-close').addClass('hidden');
      this.$el.find('#toggle-open').removeClass('hidden');
    } else {
      this.$el.find('#toggle-open').addClass('hidden');
      this.$el.find('#toggle-close').removeClass('hidden');
    }
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
    this.renderActiveWorkspaceTitle();
    // this.addRandomColorToInitials();
    return this;
  },

  renderActiveWorkspaceTitle: function () {
    this.$('.nav-current-workspace-title').html(this._workspaceTitle);
  },

  addRandomColorToInitials: function () {
    var user = this.collection.get(382).workTeam().findWhere({
      id: TmUp.CURRENT_USER.id
    });

    if (user) {
      var randomColor = user.color;
      this.$('.user-initials').css({"background-color": randomColor});
    }
  }
  // renderActiveWorkspaceTitle: function () {
  //   if (this.collection.length > 0) {
  //     this.$('.nav-current-workspace-title').html(Cookies.get('current-workspace-title'));
  //   }
  // }

});
