import Ember from "ember";

export default Ember.Controller.extend({
  actions: {
    submit: function(apiKey) {
      var self = this;
      this.get("container").lookup("adapter:application").set("apiKey", apiKey);
      this.transitionToRoute("marketplace");
    },
  }
});
