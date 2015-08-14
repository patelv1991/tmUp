window.TmUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var workspaces = new TmUp.Collections.Workspaces();
    
    var router = new TmUp.Routers.Router({
      $rootEl: $("#main"),
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

// $(document).ready(function(){
//   TmUp.initialize();
// });
