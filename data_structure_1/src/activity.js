function Activity(activity_name) {
    this.name = activity_name;
    this.sign_ups = [];
    this.bids = [];
}

Activity.prototype.create = function() {
    var activities = JSON.parse(localStorage.activities || []);
    activities.push(this);
    localStorage['activities'] = JSON.stringify(activities);
};

Activity.prototype.active = function() {
    localStorage.current_activity = this.name;
};

Activity.get_current_activity = function () {
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities,{name:localStorage.current_activity})
};

Activity.set_signing_up = function() {
    localStorage.is_signing_up = "";
};