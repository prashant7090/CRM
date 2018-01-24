/**
 * Meeting model events
 */

'use strict';

import {EventEmitter} from 'events';
var MeetingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MeetingEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Meeting) {
  for(var e in events) {
    let event = events[e];
    Meeting.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    MeetingEvents.emit(event + ':' + doc._id, doc);
    MeetingEvents.emit(event, doc);
  };
}

export {registerEvents};
export default MeetingEvents;
