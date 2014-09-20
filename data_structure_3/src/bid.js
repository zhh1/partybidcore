function Bid(id) {
    this.name = "竞价" + JSON.parse(localStorage.bids).length + 1;
    this.activity_id = id;
    this.biddings = [];
}

Bid.get_bid = function() {
    return JSON.parse(localStorage.bids);
};

Bid.set_bid = function(bid) {
    localStorage.bids = JSON.stringify(bid);
};

function create_new_bid(id) {
    var bid = new Bid(id);
    var bids = Bid.get_bid();
    bids.push(bid);
    Bid.set_bid(bids);
}