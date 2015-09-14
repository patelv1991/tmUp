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
    // 'click body:not(.search-results-list)': 'removeBtn'
  },

  removeBtn: function (event) {
    // debugger
    event.preventDefault();
    this.remove();
    $('body :not(.search-results-list)').off('click');
  },
  // only hard refreshes the page when going to different workspace
  visitSelectedPage: function (event) {
    this.remove();
    var link = $(event.currentTarget).data('link').split('/').slice(1,3).join('/');
    var currentLink = window.location.hash.split('/').slice(1,3).join('/');
    if (link !== currentLink) {
      window.location.reload();
    }
  },

  render: function () {
    debugger
    var content = this.template({
      workspaces: this.workspaces,
      users: this.users,
      projects: this.projects,
      tasks: this.tasks,
      // visitSelectedPage: this.visitSelectedPage
    });

    this.$el.html(content);
    $searchBar = $('.navbar-right > li > div.search-field');
    this.$el.addClass('search-container');
    this.$el.offset({ top: 51, left: $searchBar.offset().left });
    this.$el.css({ "width": $searchBar.width(), "z-index": 11000 });
    return this;
  }
});
