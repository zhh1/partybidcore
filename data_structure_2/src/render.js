function render_sign_ups() {
    return Activity.get_activities()[localStorage.current_activity].sign_ups;

}

function transform_bids_to_view_model(id) {
    return _(Activity.get_activities()[id].bids).map(function(name) {
        return {name:name}
    }).value();
}

function transform_biddings_to_view_model(activity_name,bid_name) {
    var group_bid = _(Activity.get_activities()[activity_name].biddings[bid_name]).groupBy(function(item) {
        return item.price
    }).value();
    var result = _(group_bid).find(function(value) {
        return value.length == 1
    });
    var name = _(Activity.get_activities()[activity_name].sign_ups).find(function(item) {
        return item.phone == result[0].phone;
    }).name;
    result[0].name = name;
    return result;
}