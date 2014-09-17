function Activity(activity_name) {
    this.name =activity_name;
    this.sign_ups = [];
    this.bids = [];
    this.biddings = {}
}

Activity.get_activities = function() {
    return JSON.parse(localStorage.activities);
};

Activity.set_activities = function(activities) {
    localStorage.activities = JSON.stringify(activities);
};

Activity.get_activity_id = function() {
    return JSON.parse(localStorage.activity_ids);
};

Activity.set_activity_id = function(id) {
    var activity = Activity.get_activity_id();
    activity.push(id);
    localStorage.activity_ids = JSON.stringify(activity);
};

Activity.prototype.create = function() {
    var activities = Activity.get_activities();
    var id = Object.keys(activities).length;
    activities[id] = this;
    Activity.set_activities(activities);
    Activity.set_activity_id(id.toString());
    localStorage.current_activity_id = id;
    localStorage.activity_id_generator = id + 1;

};