function Bid(name) {
    this.name = name;
    this.biddings = [];
}

function create_new_bid(activity_name){
    var activities = JSON.parse(localStorage.activities || []);
    var bid = new Bid("竞价1");
    _.each(activities,function(item){
        if(item.name == activity_name) {
            item.bids.push(bid);
        }
    });
    localStorage.activities = JSON.stringify(activities);
}