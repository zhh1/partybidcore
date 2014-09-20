function notify_sms_received(sms){
    var result = sms.messages[0].message.replace(/\s/g,'');
    if(result.search(/bm/i) == 0) {
        var sign_up = new SignUp(sms);
        sign_up.sign_up();
    }
    if(result.search(/jj/i) == 0) {
        Bid.bid_success(sms);
    }
}