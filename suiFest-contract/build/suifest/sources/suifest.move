module suifest::suifest {
    use sui::coin;
    use sui::event;
    use sui::sui::SUI;
    use sui::url::{Self, Url};
    use std::string::String;
    use sui::balance::{Self, Balance};
    use sui::clock::Clock;


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

    public struct EventTicket has key, store {
        id: UID,
        event_id: ID,
        attendee: address,
    }


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

    // Register for event
    public fun register_for_event(event: &mut Event, ctx: &mut TxContext): EventTicket {
        assert!(vector::length(&event.attendees) < event.max_attendees, 0); // Check if the event has reached maximum capacity

        let attendee_address = tx_context::sender(ctx);
        assert!(!vector::contains(&event.attendees, &attendee_address), 1); // Check if the attendee has already registered

        vector::push_back(&mut event.attendees, attendee_address); // Add the attendee to the event's attendees list

        // Create and transfer the EventTicket object
        let ticket = EventTicket {
            id: object::new(ctx),
            event_id: object::uid_to_inner(&event.id),
            attendee: attendee_address,
        };
        ticket
    }



}

// ///$ export PACKAGE_ID=0x468daa33dfcb3e17162bbc8928f6ec73744bb08d838d1b6eb94eac99269b29fe
// $ export MY_ADDRESS=$(sui client active-address)
// sui client call --function create_event --module suifest --package $PACKAGE_ID --args "Techie" "some desc" "Lag" "23-01-2024" 1 100 --gas-budget 10000000
// sui client call --function edit_event --module suifest --package $PACKAGE_ID --args 0x43b7abd8e84f129f0923d19588ca2efbb5c1429dc6418db2820fa223ed45bdd8 "Techie" "some desc" "Lagos" "25-01-2024" 1 200 --gas-budget 10000000
// sui client call --function register_for_event --module suifest --package $PACKAGE_ID --args 0x7c5d2246231141d279d8063a28633a6978773c3ff403b421096e7dfa414f152a --gas-budget 10000000
//sui keytool import "$ADMIN_PHRASE" ed25519
//$ sui client publish --gas-budget 100000000 --json
