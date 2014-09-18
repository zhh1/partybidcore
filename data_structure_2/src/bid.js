function create_new_bid(id) {
    var activities = Activity.get_activities();
    activities[id].bids.push("竞价" + (activities[id].bids.length +1));
    activities[id].biddings["竞价" + activities[id].bids.length] = [];
    Activity.set_activities(activities);
}

function judge_bidding(sms_json) {
    if(localStorage.is_bidding == "true") {
        has_signed_up(sms_json);
    }
}

function has_signed_up(sms_json) {
    var activities = Activity.get_activities();
    if(_(activities[localStorage.current_activity_id].sign_ups).some(function(item) {
        return item.phone == sms_json.messages[0].phone;
    })) {
        is_bided(sms_json);
    }
}

function is_bided(sms_json) {

    var activities = Activity.get_activities();
    if(!_(activities[localStorage.current_activity_id].biddings[localStorage.current_bid]).some(function(item) {
        return item.phone == sms_json.messages[0].phone;
    })) {
        bid_success(sms_json);
    }
}

function bid_success(sms_json) {
    var result = sms_json.messages[0].message.replace(/ \s/g,'');
    var bid = {
        price:result.substr(2),
        phone:sms_json.messages[0].phone
    };
    var activities = Activity.get_activities();
    activities[localStorage.current_activity_id].biddings[localStorage.current_bid].push(bid);

    Activity.set_activities(activities);
}