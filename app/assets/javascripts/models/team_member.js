TmUp.Models.TeamMember = Backbone.Model.extend({
  url: 'api/users',

  initialize: function () {
    this.color = this.randomColor();
  },
  
  randomColor: function () {
    var x = Math.round(0xffffff * Math.random()).toString(16);
    var y = (6-x.length);
    var z = '000000';
    var z1 = z.substring(0,y);
    return "#" + z1 + x;
  }


});
