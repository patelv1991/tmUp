TmUp.Collections.WorkTeam = Backbone.Collection.extend({
  url: 'api/users',
  model: TmUp.Models.TeamMember
});
