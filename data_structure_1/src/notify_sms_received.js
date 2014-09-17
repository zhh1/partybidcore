function notify_sms_received(sms_json){
    if(sms_json.messages[0].message.search(/bm/i) == 0) {
        var sign_up = new SignUp(sms_json);
        SignUp.judge_signing_up(sign_up);
    }
    if(sms_json.messages[0].message.search(/jj/i) == 0) {
        Bid.judge_is_bidding(sms_json);
    }
}