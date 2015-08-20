TmUp.Views.NavShow = Backbone.View.extend({
  template: JST['nav/nav_bar'],

  initialize: function (options) {
    this.workspaces = this.collection.fetch();
    this.router = options.router;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.renderActiveWorkspaceTitle);
    this.listenTo(this.router, "route", this.getRouteNameAndParams);
  },

  events: {
    'click .log-out':'logOut',
    'click .new-workspace': 'createNewWorkspace'
  },

  renderActiveWorkspaceTitle: function (id) {
    workspace = this.collection.get(id);
    if (this._routeName === 'show') {
      this.$('.nav-current-workspace-title').html(workspace.escape('title'));
    }
  },

  getRouteNameAndParams: function (routeName, params) {
    // debugger
    this._routeName = routeName;
    this._workspaceId = parseInt(params[0]);

    if (routeName === "show" && params[0] !== null) {
      this.renderActiveWorkspaceTitle(this._workspaceId);
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
    // this.renderActiveWorkspaceTitle();
    return this;
  },

  // renderActiveWorkspaceTitle: function () {
  //   if (this.collection.length > 0) {
  //     this.$('.nav-current-workspace-title').html(Cookies.get('current-workspace-title'));
  //   }
  // }

});
