import Ember from "ember";
import Model from "./core/model";
import BK from "./core/method-generators";

var Transaction = Model.extend({
  fetchEvents: BK.fetchCollection("event"),
  fetchLogs: BK.fetchCollectionForUri("log", "/logs", {
    method: ["post", "put", "delete"],
    resource_id: function() {
      return this.get("id");
    },
  }),

  isUnlinked: Ember.computed.not("links.order"),

  amount_dollars: function() {
    if (this.get('amount')) {
      return (this.get('amount') / 100).toFixed(2);
    } else {
      return null;
    }
  }.property('amount'),

  dasherized_funding_instrument_type: function() {
    if (this.get('funding_instrument_type')) {
      return Ember.String.dasherize(this.get('funding_instrument_type'));
    } else {
      return '';
    }
  }.property('funding_instrument_type'),

  status_description: function() {
    if (this.get('is_failed')) {
      if (this.get('failure_reason') || this.get('failure_reason_code')) {
        return this.get('failure_reason') || this.get('failure_reason_code');
      }
      return 'The transaction failed, no failure reason was given.';
    } else {
      return undefined;
    }
  }.property('is_failed', 'status', 'failure_reason', 'failure_reason_code'),

  is_failed: isStatus('failed'),
  is_pending: isStatus('pending'),
  is_succeeded: isStatus('succeeded')
});

function isStatus(status) {
  return Ember.computed.equal('status', status);
}

export default Transaction;
