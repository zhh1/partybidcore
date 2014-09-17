function render_sign_ups(activity_name) {
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities,{name:activity_name}).sign_ups;
}

function transform_bids_to_view_model(activity_name) {
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities,{name:activity_name}).bids;
}

function transform_biddings_to_view_model(activity_name,bid_name) {
    var bidding = get_bidding(activity_name,bid_name);
    var result = [];
    var sort_bidding = _.sortBy(bidding,function(item) {
        return parseInt(item.price)
    });
    var group_bidding = _.groupBy(bidding,function(item) {
        return item.price;
    });
    _.map(group_bidding,function(value,key) {
        result.push({"price":key,"number":value.length});
    });
    var bid_result = _.find(result,{number:1});
    if(bid_result !== undefined) {
        return _.where(sort_bidding,{price:bid_result.price});
    }
}

function get_bidding(activity_name,bid_name) {
    var activities = JSON.parse(localStorage.activities);
    var bids = _.find(activities,{name:activity_name}).bids;
    return _.find(bids,{name:bid_name}).biddings;
}