TmUp.Views.About = Backbone.View.extend({
  template: JST['about/about'],

  events: {
    'click .m-background': 'removeBtn',
    'click .close': 'removeBtn'
  },

  removeBtn: function (event) {
    event.preventDefault();
    this.remove();
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});
