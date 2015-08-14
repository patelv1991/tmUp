TmUp.Views.NavShow = Backbone.View.extend({
  template: JST['nav/nav_bar'],

  initialize: function (options) {
    this.collection.fetch();
    this.router = options.router;
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(this.router, "route", this.handleRoute);
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  render: function () {
    var content = this.template({
      workspaces: this.collection
    });
    this.$el.html(content);
    return this;
  }

});
