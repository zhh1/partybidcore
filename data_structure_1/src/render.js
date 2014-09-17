function render_sign_ups(activity_name) {
    var activities = JSON.parse(localStorage.activities);
    return _.find(activities,{name:activity_name}).sign_ups;
}