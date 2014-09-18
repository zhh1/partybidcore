function SignUp(sms_json) {
    var result = sms_json.messages[0].message.replace(/ \s/g,'');
    this.name = result.substr(2);
    this.phone = sms_json.messages[0].phone;
}


SignUp.prototype.process_sign_up_sms = function() {
    var activities = Activity.get_activities();
    var current_activity = activities[localStorage.current_activity_id];
    current_activity.sign_ups.push(this);
    activities[localStorage.current_activity_id] = current_activity;
    Activity.set_activities(activities);
};

SignUp.prototype.is_signing_up = function() {
    if(localStorage.is_signing_up == 'true') {
        this.process_sign_up_sms();
    }
};

SignUp.prototype.is_repeat = function() {
    var activities = Activity.get_activities();
    var sign_up = activities[localStorage.current_activity_id].sign_ups;
    if(!_.some(sign_up,{phone:this.phone},this)) {
        this.is_signing_up();
    }

};