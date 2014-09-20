function SignUp(sms) {
    var result = sms.messages[0].message.replace(/\s/g,'');
    this.phone = sms.messages[0].phone;
    this.name = result.substr(2);
    this.activity_id = localStorage.current_activity;
}

SignUp.set_sign_ups = function(sign_up){
    localStorage.sign_ups = JSON.stringify(sign_up);
};

SignUp.get_sign_ups = function() {
    return JSON.parse(localStorage.sign_ups);
};

SignUp.find_by_id = function(id) {
    return _.where(SignUp.get_sign_ups(),function(item) {
        return item.activity_id == id;
    })
};

SignUp.prototype.judge_is_signing_up = function() {
    return localStorage.is_signing_up == "true";
};

SignUp.prototype.is_repeat = function() {
    return _(SignUp.get_sign_ups()).some(function(item) {
        return item.phone == this.phone;
    },this)
};

SignUp.prototype.sign_up = function() {
    if(!this.judge_is_signing_up()) {
        return;
    }
    if(!this.is_repeat()) {
        var sign_ups = SignUp.get_sign_ups();
        sign_ups.push(this);
        SignUp.set_sign_ups(sign_ups);
    }
};

SignUp.has_signed_up = function(sms) {
    return _.some(SignUp.get_sign_ups(),function(item) {
        return item.phone == sms.messages[0].phone;
    })
};

SignUp.find_name = function(sms) {
    return _.find(SignUp.get_sign_ups(),function(item) {
        return item.phone == sms.messages[0].phone && item.activity_id == localStorage.current_activity;
    }).name;
};

