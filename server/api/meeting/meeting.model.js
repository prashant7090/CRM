'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './meeting.events';

var MeetingSchema = new mongoose.Schema({
	sales_person: String,	
	company_name: String, 	
	contact_perosn_name: String, 	
	contact_no: Number, 	
	email : String,	
	city: String,
	pin_code: Number, 	
	state: String, 	
	machine_model: String, 	
	status: String,
	active: Boolean
});

registerEvents(MeetingSchema);
export default mongoose.model('Meeting', MeetingSchema);

	
