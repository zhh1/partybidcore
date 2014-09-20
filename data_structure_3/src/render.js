function render_sign_ups(id) {
    return SignUp.find_by_id(id);
}

function render_bids(id) {
    return Bid.find_by_id(id);
}

function render_biddings(id,bid_name) {
    var current_bid = Bid.get_current_bid(id,bid_name)[0].biddings;
    var sort_bid = _.sortBy(current_bid, function (item) {
        return parseInt(item.price);
    });
    var group_bid = _.groupBy(sort_bid, function (item) {
        return parseInt(item.price);
    });
    return _.find(group_bid, function (value) {
        return value.length == 1;
    })
}