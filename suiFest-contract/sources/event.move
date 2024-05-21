/*
/// Module: suifest-contract
module suifest-contract::suifest-contract {

}
*/
pragma version 0.1.0;

import 0xEventNFT; // Import the EventNFT contract

// Public function to create a new event
public fun createEvent(
  name: vector<u8>,
  date: u64,
  location: vector<u8>,
  description: vector<u8>,
  ticket_price: option<u128>,
  max_attendees: u64
) {
  // Create a new Event resource with provided details
  let event = Event {
    id: 0, // ID not relevant for this contract
    name: name,
    date: date,
    location: location,
    description: description,
    ticket_price: ticket_price,
    max_attendees: max_attendees
  };

  // Mint a unique EventNFT resource for the organizer
  EventNFT::init(event);
}


