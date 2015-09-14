window.TmUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Cookies.set('current-logged-in-user', TmUp.CURRENT_USER.id);

    var workspaces = new TmUp.Collections.Workspaces();

    var router = new TmUp.Routers.Router({
      $landingEl: $("#landing-page"),
      $mainEl: $("#main"),
      workspaces: workspaces
    });

    var nav = new TmUp.Views.NavShow({
      router: router,
      collection: workspaces
    });

    $("#navbar").html(nav.render().$el);
    Backbone.history.start();
  }
};

TmUp.checkCurrentUser = function () {
    var value = Cookies.get('current-workspace-id') && (
      Cookies.get('last-logged-in-user') == TmUp.CURRENT_USER.id
    );
    return value;
  };
