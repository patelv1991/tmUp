TmUp.Views.TeamIndex = Backbone.CompositeView.extend({
  template: JST['teams/index'],

  events: {
    'click .glyphicon-user': 'showWorkTeamForm'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addMemberSubView);
    // this.listenTo(this.workspace, 'sync', this.render);
    this.collection.each(function (member) {
      this.addMemberSubView(member);
    }.bind(this));
  },

  addMemberSubView: function (member) {
    var view = new TmUp.Views.TeamIndexItem({
      model: member,
      workspace: this.model
    });
    this.addSubview('.team-members', view);
  },
  //
  // removeMemberSubView: function (member) {
  //   var view
  // },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  showWorkTeamForm: function () {
    modal = new TmUp.Views.TeamMemberForm({
      collection: this.collection,
      model: this.model
    });
    $('body').append(modal.$el);
    modal.render();
  }
});
