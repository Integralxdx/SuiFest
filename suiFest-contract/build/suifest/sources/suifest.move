module suifest::suifest {
    use sui::coin;
    use sui::event;
    use sui::sui::SUI;
    use sui::url::{Self, Url};
    use std::string::String;
    use sui::balance::{Self, Balance};
    use sui::clock::Clock;

    // === Events ===
    public struct EventCreated has copy, drop {
        id: ID,
        name: String,
        host: address,
        ticket_price: u64,
    }

    public struct EventEdited has copy, drop {
        id: ID,
        name: String,
        ticket_price: u64,
    }

    public struct AttendeeRegistered has copy, drop {
        event_id: ID,
        attendee: address,
    }

    // === Structs ===
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

    // === Functions ===
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

        event::emit(EventCreated {
            id: eventObject.id.to_inner(),
            name,
            host,
            ticket_price,
        });

        transfer::share_object(eventObject);
    }

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
        assert!(tx_context::sender(ctx) == event.host, 0);

        event.name = new_name;
        event.description = new_description;
        event.location = new_location;
        event.date = new_date;
        event.ticket_price = new_ticket_price;
        event.max_attendees = new_max_attendees;

        event::emit(EventEdited {
            id: event.id.to_inner(),
            name: new_name,
            ticket_price: new_ticket_price,
        });
    }

    public fun register_for_event(event: &mut Event, ctx: &mut TxContext): EventTicket {
        assert!(vector::length(&event.attendees) < event.max_attendees, 0);

        let attendee_address = tx_context::sender(ctx);
        assert!(!vector::contains(&event.attendees, &attendee_address), 1);

        vector::push_back(&mut event.attendees, attendee_address);

        let ticket = EventTicket {
            id: object::new(ctx),
            event_id: object::uid_to_inner(&event.id),
            attendee: attendee_address,
        };

        event::emit(AttendeeRegistered {
            event_id: event.id.to_inner(),
            attendee: attendee_address,
        });

        ticket
    }
}
