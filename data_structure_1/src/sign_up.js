function SignUp(sms_json) {
    var result = sms_json.messages[0].message.replace(/ \s /g,"");
    this.name = result.substring(2);
    this.phone = sms_json.messages[0].phone;
}

SignUp.sign_up = function(sign_up) {
    if(!sign_up.is_phone_repeat()) {
        sign_up.process_sms_json();
    }
};

SignUp.judge_signing_up = function(sign_up){
    if(localStorage.is_signing_up == "true") {
        SignUp.sign_up(sign_up);
    }
};

SignUp.prototype.process_sms_json = function() {
    var activities = JSON.parse(localStorage.activities);
    _.each(activities,function(item) {
        if(item.name == localStorage.current_activity) {
            return item.sign_ups.push(this)
        }
    },this);
    localStorage.activities = JSON.stringify(activities);
};

SignUp.prototype.is_phone_repeat = function() {
    var current_activity = Activity.get_current_activity();
    var sign_up = current_activity.sign_ups;
    return _.some(sign_up,{phone:this.phone},this)
};




