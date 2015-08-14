TmUp.Views.NavShow = Backbone.View.extend({
  template: JST['nav/nav_bar'],

  initialize: function (options) {
    this.collection.fetch();
    this.router = options.router;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.router, "route", this.handleRoute);
  },

  events: {
    'click .log-out':'logOut'
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  logOut: function (event) {
    $.ajax({
      url: "/session",
      type: 'POST',
      data: {_method: 'delete'},
      success: function (html, status, object) {
        window.location = "session/new";
      }
    });
  },


  render: function () {
    var content = this.template({
      workspaces: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
