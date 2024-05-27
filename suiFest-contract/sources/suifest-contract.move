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


    // public struct UserEvents has key {
    //     id: UID,
    //     event_owner_cap: ID,
    //     balance: Balance<SUI>,
    //     events: vector<Event>
    // }

    // public struct EventOwnerCapability has key {
    //     id: UID,
    //     event: ID,
    // }

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

// ///$ export PACKAGE_ID=0x468daa33dfcb3e17162bbc8928f6ec73744bb08d838d1b6eb94eac99269b29fe
// $ export MY_ADDRESS=$(sui client active-address)
// sui client call --function create_event --module suifest --package $PACKAGE_ID --args "Techie" "some desc" "Lag" "23-01-2024" 1 100 --gas-budget 10000000
// sui client call --function edit_event --module suifest --package $PACKAGE_ID --args 0x43b7abd8e84f129f0923d19588ca2efbb5c1429dc6418db2820fa223ed45bdd8 "Techie" "some desc" "Lagos" "25-01-2024" 1 200 --gas-budget 10000000
//sui keytool import "$ADMIN_PHRASE" ed25519