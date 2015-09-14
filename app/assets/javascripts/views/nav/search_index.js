TmUp.Views.SearchIndex = Backbone.View.extend({
  template: JST['nav/search_index'],

  initialize: function (options) {
    this.workspaces = options.workspaces;
    this.users = options.users;
    this.projects = options.projects;
    this.tasks = options.tasks;
    $('body :not(.search-results-list)').on('click', this.removeBtn.bind(this));
  },

  events: {
    'click div.search-results-list div ul li a': 'visitSelectedPage',
  },

  removeBtn: function (event) {
    this.remove();
  },

  visitSelectedPage: function (event) {
    this.remove();
    var link = $(event.currentTarget).data('link').split('/').slice(1,3).join('/');
    var currentLink = window.location.hash.split('/').slice(1,3).join('/');

    // This makes sures that page is never hard refreshed
    var route1 = $(event.currentTarget).data('link').split('/').slice(0,3).join('/');
    var route2 = $(event.currentTarget).data('link').split('/').slice(3,5).join('/');
    Backbone.history.navigate(route1, { trigger: true });
    route2 && Backbone.history.navigate(route1 + "/" + route2, { trigger: true });
  },

  render: function () {
    var content = this.template({
      workspaces: this.workspaces,
      users: this.users,
      projects: this.projects,
      tasks: this.tasks,
    });

    this.$el.html(content);
    $searchBar = $('.navbar-right > li > div.search-field');
    this.$el.addClass('search-container');
    this.$el.offset({ top: 51, left: $searchBar.offset().left });
    this.$el.css({ "width": $searchBar.width(), "z-index": 11000 });
    return this;
  }
});
