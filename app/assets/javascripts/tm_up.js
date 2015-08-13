window.TmUp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new TmUp.Routers.Router({
      $rootEl: $("#main"),
      workspaces: new TmUp.Collections.Workspaces()
    });
    Backbone.history.start();
  }
};

// $(document).ready(function(){
//   TmUp.initialize();
// });
