TmUp.Views.NavShow = Backbone.View.extend({
  template: JST['nav/nav_bar'],

  initialize: function (options) {
    this.workspaces = this.collection.fetch();
    this.router = options.router;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.collection, 'sync', this.addRandomColorToInitials);
    this.listenTo(this.router, "route", this.getRouteNameAndParams);
    $(document).on('keyup', this.removeSearchResults.bind(this));
    // this.listenTo(this.collection, 'sync', this.renderActiveWorkspaceTitle);
  },

  events: {
    'click .log-out':'logOut',
    'click .new-workspace': 'createNewWorkspace',
    'click .menu-toggle': 'handleToggle',
    'click #tmup-tour': 'startTour',
    'click #about-me': 'showAboutMePage',
    'input .search-field > input': 'search',
    // 'focus .search-field > input': 'removeSearchResults'
  },

  startTour: function () {
    var tour;
    if (this._routeName === undefined || this._routeName === 'index') {
      tour = introJs().setOptions({
        'showStepNumbers': false,
        'doneLabel': 'Next page',
        'disableInteraction': true
      }).start();

      tour.oncomplete(function() {
        window._resumeTour = true;
        var workspaceId = this.collection.at(1).id;
        var route = "#/workspaces/" + workspaceId;
        window.location.href = route + '?multipage=true';
      }.bind(this));
    } else {
      tour = introJs().setOptions({
        'showStepNumbers': false,
        'disableInteraction': true
      }).start();
      tour.onchange(function (nextStep) {
        this.goToProjectShowPage(nextStep);
      }.bind(this));
    }
  },

  resumeTour: function () {
    var tour;
    tour = introJs().setOptions({
      'showStepNumbers': false,
      'disableInteraction': true
    }).start();
    tour.onchange(function (nextStep) {
      this.goToProjectShowPage(nextStep);
    }.bind(this));
    window._resumeTour = false;
  },

  goToProjectShowPage: function (nextStep) {
    var nextStepId = $(nextStep).data('step');
    if (nextStepId === 3) {
      var currentWorkspaceId = Cookies.get('current-workspace-id');
      var w = this.collection.get(currentWorkspaceId);
      var projectId = w.projects().first().id;
      var route = "#/workspaces/" + currentWorkspaceId + '/project/' + projectId;
      window.location.href = route;
    }
  },

  showAboutMePage: function () {
    var aboutView = new TmUp.Views.About();
    $('body').append(aboutView.$el);
    aboutView.render();
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

    if (window._resumeTour) {
      this.resumeTour();
    }
  },

  removeSidebarButton: function () {
    this.$el.find('#toggle-close').addClass('hidden');
    this.$el.find('#toggle-open').addClass('hidden');
  },

  renderSbButtonToOpen: function () {
    this.$el.find('#toggle-close').addClass('hidden');
    this.$el.find('#toggle-open').removeClass('hidden');

    // this handles box-shadow for navbar when sidebar is hidden
    $('.navbar').removeClass('toggled-sidebar');

    // this handles size of task index container when sidebar is hidden
    $('#page-content-wrapper').removeClass('sidebar-toggled');
  },

  renderSbButtonToClose: function () {
    if (this._routeName !== "index" && this._routeName !== undefined) {
      this.$el.find('#toggle-close').removeClass('hidden');
      this.$el.find('#toggle-open').addClass('hidden');

      // this handles box-shadow for navbar when sidebar is toggled
      $('.navbar').addClass('toggled-sidebar');

      // this handles size of task index container when sidebar is toggled
      $('#page-content-wrapper').addClass('sidebar-toggled');
    }
  },

  handleToggle: function (e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");

    var dataTag = this.$el.find('.hidden').data('toggle');
    (dataTag === "closed") ? this.renderSbButtonToOpen() : this.renderSbButtonToClose();
  },

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

  search: function (event) {
    if ($(event.target).val() === "") {
      $('.search-results-list').parent().remove();
    }

    event.preventDefault();
    var searchData = $(event.target).val().trim();

    if (searchData !== "") {
      $.ajax({
        url: "api/workspaces",
        dataType: "json",
        method: "GET",
        data: { search: searchData },
        success: this.renderResults.bind(this)
      });
    }
  },

  renderResults: function (results) {
    w = new TmUp.Collections.Workspaces(results.workspaces);
    u = new TmUp.Collections.WorkTeam(results.users);
    p = new TmUp.Collections.Projects(results.projects);
    t = new TmUp.Collections.Tasks(results.tasks);
    var searchResultView = new TmUp.Views.SearchIndex({
      workspaces: w,
      users: u,
      projects: p,
      tasks: t
    });

    if ($('.search-results-list')) {
      $('.search-results-list').parent().remove();
      $('body').append(searchResultView.$el);
      searchResultView.render();
    }
  },

  removeSearchResults: function (e) {
    if (e.keyCode == 8 && $('div.search-field > input').val() === "") {
      $('.search-results-list').parent().remove();
    }
  },

  render: function () {
    var content = this.template({
      workspaces: this.collection
    });
    this.$el.html(content);
    this.renderSbButtonToClose();
    this.renderActiveWorkspaceTitle();
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
});
