function create_new_bid(id) {
    var activities = Activity.get_activities();
    activities[id].bids.push("竞价1");
    activities[id].biddings["竞价1"] = [];
    Activity.set_activities(activities);  
}