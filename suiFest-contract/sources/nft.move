pragma version 0.1.0;

// Event details stored on-chain
struct Event {
  id: u64,
  name: vector<u8>,
  date: u64, // Represents timestamp in seconds
  location: vector<u8>,
  description: vector<u8>,
  ticket_price: option<u128>, // Optional for free events
  max_attendees: u64
}

// NFT resource representing an event ticket
struct EventNFT {
  id: u64,
  event: Event,
  owner: address
  attendees: vector<address> // List of attendees (avoids storage cost of maps)
}

// Public functions of the EventNFT contract
public fun init(event: Event) {
  // Creates a new EventNFT resource with provided event details
  let mut enft = EventNFT {
    id: 0,
    event: event,
    owner: signer,
    attendees: []
  };
  enft.id = generate_id(&enft);
  move_to(enft);
}

public fun buyTicket(addr: address) payable (en: EventNFT) {
  // Requires payment if ticket_price is set
  let event_nft: &EventNFT = &load<EventNFT>(0); // Assuming single event per contract for simplicity
  if (event_nft.event.ticket_price.is_some()) {
    let price = event_nft.event.ticket_price.value;
    assert!(signer.balance >= price, BORROW_FUNDS);  // Custom error for insufficient funds
    signer.borrow_from(&event_nft.owner, price);
  }

  // Creates a new EventNFT resource (can be optimized for multiple tickets)
  let mut new_nft = EventNFT {
    id: generate_id(&new_nft),
    event: event_nft.event,
    owner: addr,
    attendees: []
  };
  move_to(new_nft);
}

public fun checkIn(addr: address) {
  // Requires user to be the owner of the NFT
  let event_nft: &mut EventNFT = &mut load<EventNFT>(0);
  assert!(event_nft.owner == addr, UNAUTHORIZED_CHECKIN); // Custom error for unauthorized access

  // Add address to attendee list (avoiding duplicates)
  if (!event_nft.attendees.contains(&addr)) {
    event_nft.attendees.push_back(addr);
  }
}

public fun generate_id(enft: &EventNFT): u64 {
  // Implement a unique ID generation logic (e.g., hash event details and current timestamp)
  let id_bytes = hash(&enft);
  return u64::from_bytes(id_bytes);
}
// Custom error codes for readability
const BORROW_FUNDS: u64 = 1;
const UNAUTHORIZED_CHECKIN: u64 = 2;