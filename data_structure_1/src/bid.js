function Bid(name) {
    this.name = name;
    this.biddings = [];
}

function create_new_bid(activity_name){
    var activities = JSON.parse(localStorage.activities || []);
    var bid = new Bid("竞价1");
    _.each(activities,function(item){
        if(item.name == activity_name) {
            item.bids.push(bid);
        }
    });
    localStorage.activities = JSON.stringify(activities);
}

Bid.judge_if_sign_up = function(sms_json) {
    var sign_ups = Activity.get_current_activity().sign_ups;
    var phone = sms_json.messages[0].phone;
    return _.some(sign_ups,{phone:phone})
};

Bid.get_person_name = function(sms_json) {
    var sign_ups = Activity.get_current_activity().sign_ups;
    var person_phone = sms_json.messages[0].phone;
    return _.find(sign_ups,{phone:person_phone}).name
};

Bid.bid = function(sms_json) {
    if(Bid.judge_if_sign_up(sms_json)) {
        Bid.save_bid(sms_json);
    }
};

Bid.save_bid = function(sms_json) {
    var activities = JSON.parse(localStorage.activities);
    var bid_messages = {
        person_name : Bid.get_person_name(sms_json),
        phone : sms_json.messages[0].phone,
        price : sms_json.messages[0].message.replace(/ \s /g,"").substring(2)
    };
    _.each(activities,function(item) {
        if(item.name == localStorage.current_activity) {
            item.bids[0].biddings.push(bid_messages);
        }
    });
    localStorage.activities = JSON.stringify(activities);
};

Bid.judge_is_bidding =function(sms_json) {
    if(localStorage.is_bidding == "true") {
        Bid.no_phone_repeat(sms_json);
    }
};

Bid.no_phone_repeat = function(sms_json) {
    if(Bid.judge_phone_repeat(sms_json)) {
        Bid.bid(sms_json);
    }
};

Bid.judge_phone_repeat = function(sms_json) {
    var bids = Activity.get_current_activity().bids;
    var person_phone = sms_json.messages[0].phone;
    var biddings = _.where(bids,{name:localStorage.current_bid})[0].biddings;
    return !_.some(biddings,{phone:person_phone})
};