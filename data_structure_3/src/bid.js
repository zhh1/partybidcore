function Bid(id) {
    this.name = "竞价" + JSON.parse(localStorage.bids).length + 1;
    this.activity_id = id;
    this.biddings = [];
}

function create_new_bid(id) {
    var bid = new Bid(id);
    var bids = Bid.get_bid();
    bids.push(bid);
    Bid.set_bid(bids);
}

Bid.get_bid = function() {
    return JSON.parse(localStorage.bids);
};

Bid.set_bid = function(bid) {
    localStorage.bids = JSON.stringify(bid);
};

Bid.is_bidding = function() {
    return localStorage.is_bidding =="true";
};

Bid.is_phone_repeat = function(sms) {
    var bidding = _.find(Bid.get_bid(),function(item) {
        return item.name == localStorage.current_bid && item.activity_id == localStorage.current_activity;
    }).biddings;
    return _.some(bidding,function(item) {
        return item.phone == sms.messages[0].phone;
    })
};

Bid.bid_success = function(sms) {
    if(!Bid.is_bidding()) {
        return;
    }
    if(!SignUp.has_signed_up(sms)) {
        return;
    }
    if(Bid.is_phone_repeat(sms)) {
        return;
    }
    var bid = {
        name : SignUp.find_name(sms),
        phone : sms.messages[0].phone,
        price : sms.messages[0].message.replace(/\s/g,'').substr(2)
    };
    var bids = Bid.get_bid();
    _.each(bids,function(item) {
        if(item.name == localStorage.current_bid && item.activity_id == localStorage.current_activity) {
            item.biddings.push(bid);
            Bid.set_bid(bids);
        }
    })
};

Bid.find_by_id = function(id) {
    return _.where(Bid.get_bid(),function(item) {
        return item.activity_id == id;
    })
};

Bid.get_current_bid = function(id,bid_name) {
    return _.where(Bid.get_bid(),function(item) {
        return item.activity_id == id && item.name == bid_name;
    })
};

