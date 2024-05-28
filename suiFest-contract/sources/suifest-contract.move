module suifest::suifest {
    use sui::coin;
    use sui::event;
    use std::vector;
    use sui::sui::SUI;
    use sui::transfer;
    use sui::url::{Self, Url};
    use sui::object::{Self, UID, ID};
    use sui::tx_context::TxContext;
    use std::string::{Self, String};
    use sui::balance::{Self, Balance};


  

    public struct Event has key {
        id: UID,
        name: String,
        description: String,
        location: String,
        date: String,
        host: address,
        ticket_price: u64,
        max_attendees: u64,
        attendees: vector<address>
    }

    // public fun ticket(){

    // }

    public fun create_event(name: String, description: String, location: String, date: String, ticket_price: u64, max_attendees: u64, ctx: &mut TxContext) {
        let host = tx_context::sender(ctx);
        let eventObject = Event {
            id: object::new(ctx),
            name,
            description,
            location,
            date,
            host,
            ticket_price,
            max_attendees,
            attendees: vector::empty<address>()
        };
        transfer::share_object(eventObject);
    }

    //Edit event
    public fun edit_event(
        event: &mut Event,
        new_name: String,
        new_description: String,
        new_location: String,
        new_date: String,
        new_ticket_price: u64,
        new_max_attendees: u64,
        ctx: &mut TxContext
    ) {
        assert!(tx_context::sender(ctx) == event.host, 0); // Only the host can edit the event

        event.name = new_name;
        event.description = new_description;
        event.location = new_location;
        event.date = new_date;
        event.ticket_price = new_ticket_price;
        event.max_attendees = new_max_attendees;
    }

}
