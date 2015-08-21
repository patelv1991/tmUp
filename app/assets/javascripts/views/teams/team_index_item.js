TmUp.Views.TeamIndexItem = Backbone.View.extend({
  template: JST['teams/index_item'],
  tagName: 'li',

  // initialize: function () {
  //   this.listenTo(this.model, 'sync', this.addRandomColorToInitials);
  // },

  render: function () {
    var content = this.template({ team_member: this.model, randomColor: this.randomColor() });
    this.$el.html(content);
    // this.addRandomColorToInitials();
    return this;
  },

  randomColor: function () {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = '000000';
    var z1 = z.substring(0,y);
    return "#" + z1 + x;
    // debugger
    // $('.sidebar-nav div > div ul.team-members li a').css({"background-color": randomColor});
  }
});
