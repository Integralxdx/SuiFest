// Sample event details for testing
let event_details = Event {
  id: 1,
  name: vector { 0x4c, 0x75, 0x6d, 0x61 }, // "Luma"
  date: 1653033600, // Sample timestamp (2023-05-21)
  location: vector { 0x53, 0x69, 0x6c, 0x69, 0x63, 0x6f, 0x6e }, // "Silicon"
  description: vector { 0x4d, 0x6f, 0x76, 0x65, 0x20, 0x63, 0x6f, 0x6e, 0x66, 0x65, 0x72, 0x65, 0x6e, 0x63, 0x65 }, // "Move conference"
  ticket_price: Some(u128::from_decimal(100)), // Price: 100 Coin
  max_attendees: 1000
};

// Test successful initialization of EventNFT
pub fun test_init_success() {
  let mut event_nft: EventNFT;
  event_nft = EventNFT::init(event_details);
  assert!(event_nft.event.name == event_details.name, 101); // Error code for name mismatch
  assert!(event_nft.event.date == event_details.date, 102); // Error code for date mismatch
  // ... (verify other event details)
  assert!(event_nft.owner == signer, 103); // Error code for owner mismatch
}

// Test buying a ticket with sufficient funds
pub fun test_buy_ticket_success() {
  // Simulate signer having enough balance
  signer.deposit(u128::from_decimal(200));

  let mut event_nft: EventNFT;
  event_nft = EventNFT::init(event_details);

  let buyer_address = account { // Create a new account for buyer
    use 0xSigner;
    Signer::new()
  };

  let bought_nft = event_nft.buy_ticket(buyer_address);
  assert!(bought_nft.owner == buyer_address, 201); // Error code for owner mismatch
  assert!(signer.balance == u128::from_decimal(100), 202); // Ensure correct amount deducted
}

// Test buying a ticket with insufficient funds (should revert)
pub fun test_buy_ticket_insufficient_funds() {
  let mut event_nft: EventNFT;
  event_nft = EventNFT::init(event_details);

  let buyer_address = account { // Create a new account for buyer
    use 0xSigner;
    Signer::new()
  };

  let result = event_nft.buy_ticket(buyer_address);
  assert!(false, result); // Transaction should revert with BORROW_FUNDS error
}

// Test check-in by the owner (should succeed)
pub fun test_check_in_success() {
  let mut event_nft: EventNFT;
  event_nft = EventNFT::init(event_details);

  event_nft.checkIn(signer); // Signer is the owner

  assert!(event_nft.attendees.contains(&signer), 301); // Error code for attendee not found
}

// Test check-in by a non-owner (should revert)
pub fun test_check_in_unauthorized() {
  let mut event_nft: EventNFT;
  event_nft = EventNFT::init(event_details);

  let unauthorized_address = account { // Create a new account for unauthorized user
    use 0xSigner;
    Signer::new()
  };

  let result = event_nft.checkIn(unauthorized_address);
  assert!(false, result); // Transaction should revert with UNAUTHORIZED_CHECKIN error
}