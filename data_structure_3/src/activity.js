function Activity(activity_name) {
    this.id = localStorage.activity_id_generator;
    this.name = activity_name;
}

Activity.get_activities = function() {
    return JSON.parse(localStorage.activities);
};

Activity.set_activities = function(activities) {
    localStorage.activities = JSON.stringify(activities);
};

Activity.prototype.create = function() {
    var activities = Activity.get_activities();
    activities.push(this);
    Activity.set_activities(activities);
    localStorage.current_activity = this.id;
    localStorage.activity_id_generator = activities.length;
};