function notify_sms_received(sms_json){
    if(sms_json.messages[0].message.search(/bm/i) == 0) {
        var sign_up = new SignUp(sms_json);
        sign_up.is_repeat();
    }
    if(sms_json.messages[0].message.search(/jj/i) == 0) {
        judge_bidding(sms_json);
    }
}