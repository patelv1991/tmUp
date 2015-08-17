TmUp.Views.TeamIndex = Backbone.CompositeView.extend({
  template: JST['teams/index'],

  events: {
    'click .glyphicon-user': 'showWorkTeamForm'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync add', this.render);
    this.listenTo(this.collection, 'add', this.addMember);

    this.collection.each(function (member) {
      this.addMember(member);
    }.bind(this));
  },

  addMember: function (member) {
    var view = new TmUp.Views.TeamIndexItem({
      model: member
    });
    this.addSubview('.team-members', view);
  },

  render: function () {
    this.$el.html(this.template());
    this.attachSubviews();
    return this;
  },

  showWorkTeamForm: function () {
    modal = new TmUp.Views.TeamMemberForm({
      collection: this.collection
    });
    $('body').append(modal.$el);
    modal.render();
  }
});
