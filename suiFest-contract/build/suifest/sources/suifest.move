module suifest::suifest {
    use sui::balance::{Self, Balance};
    use sui::coin::{Self, Coin};
    use sui::dynamic_field;
    use sui::event;
    use sui::object::{Self, ID, UID};
    use sui::sui::SUI;
    use sui::tx_context::{Self, TxContext};
    use sui::transfer;
    use sui::url::{Self, Url};
    use sui::clock::{Self, Clock};
    use std::string::{Self, String};

    // === Constants ===
    const E_NOT_HOST: u64 = 0;
    const E_EVENT_FULL: u64 = 1;
    const E_INSUFFICIENT_FUNDS: u64 = 2;
    const E_ALREADY_REGISTERED: u64 = 3;

    // === Events ===
    public struct EventCreated has copy, drop {
        event_id: ID,
        name: String,
        host: address,
        ticket_price: u64,
    }

    public struct EventEdited has copy, drop {
        event_id: ID,
        name: String,
        ticket_price: u64,
    }

    public struct TicketMinted has copy, drop {
        event_id: ID,
        attendee: address,
        ticket_id: ID,
    }

    public struct CheckedIn has copy, drop {
        ticket_id: ID,
        timestamp: u64,
    }

    // === Core Structs ===
    public struct HostCapability has key {
        id: UID,
        event_id: ID,
    }

    public struct Event has key {
        id: UID,
        name: String,
        description: String,
        location: String,
        date: String,
        ticket_price: u64,
        max_attendees: u64,
        attendees_count: u64,
        treasury: Balance<SUI>,
    }

    public struct EventTicket has key, store {
        id: UID,
        event_id: ID,
        attendee: address,
        checked_in: bool,
        memories: vector<Url>,
    }

    // === Core Functions ===
    public entry fun create_event(
        name: String,
        description: String,
        location: String,
        date: String,
        ticket_price: u64,
        max_attendees: u64,
        ctx: &mut TxContext
    ) {
        let host = tx_context::sender(ctx);
        let event_id = object::new(ctx);
        
        let event = Event {
            id: event_id,
            name,
            description,
            location,
            date,
            ticket_price,
            max_attendees,
            attendees_count: 0,
            treasury: balance::zero<SUI>(),
        };

        transfer::transfer(
            HostCapability {
                id: object::new(ctx),
                event_id: object::uid_to_inner(&event.id),
            },
            host
        );

        event::emit(EventCreated {
            event_id: object::uid_to_inner(&event.id),
            name: copy name,
            host,
            ticket_price,
        });

        transfer::share_object(event);
    }

    public entry fun purchase_ticket(
        event: &mut Event,
        payment: &mut Coin<SUI>,
        ctx: &mut TxContext
    ) {
        let attendee = tx_context::sender(ctx);
        assert!(coin::value(payment) >= event.ticket_price, E_INSUFFICIENT_FUNDS);
        assert!(event.attendees_count < event.max_attendees, E_EVENT_FULL);

        // Split payment
        let ticket_price = event.ticket_price;
        let payment_balance = coin::into_balance(coin::split(payment, ticket_price, ctx));
        balance::join(&mut event.treasury, payment_balance);

        // Mint ticket
        let ticket = EventTicket {
            id: object::new(ctx),
            event_id: object::uid_to_inner(&event.id),
            attendee,
            checked_in: false,
            memories: vector::empty(),
        };

        event.attendees_count = event.attendees_count + 1;

        event::emit(TicketMinted {
            event_id: object::uid_to_inner(&event.id),
            attendee,
            ticket_id: object::uid_to_inner(&ticket.id),
        });

        transfer::transfer(ticket, attendee);
    }

    public entry fun check_in(
        ticket: &mut EventTicket,
        clock: &Clock,
        _ctx: &mut TxContext
    ) {
        assert!(!ticket.checked_in, E_ALREADY_REGISTERED);
        ticket.checked_in = true;
        
        event::emit(CheckedIn {
            ticket_id: object::uid_to_inner(&ticket.id),
            timestamp: clock::timestamp_ms(clock),
        });
    }

    public entry fun add_memory(
        ticket: &mut EventTicket,
        memory_url: String,  // Take ownership of the String
        _cap: &HostCapability
    ) {
        // Convert String -> vector<u8> using proper method
        let bytes = string::into_bytes(memory_url);
        vector::push_back(
            &mut ticket.memories, 
            url::new_unsafe_from_bytes(bytes)  // Now passing vector<u8>
        );
    }

    // public fun withdraw_earnings(
    //     event: &mut Event,
    //     _cap: &HostCapability,
    //     ctx: &mut TxContext
    // ): Coin<SUI> {
    //     // Get full balance value
    //     let amount = balance::value(&event.treasury);
    //     // Split balance using coin module
    //     let coin_balance = coin::withdraw(&mut event.treasury, amount);
    //     coin::from_balance(coin_balance, ctx)
    // }
}