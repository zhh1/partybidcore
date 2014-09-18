function render_sign_ups() {
    return Activity.get_activities()[localStorage.current_activity].sign_ups;

}