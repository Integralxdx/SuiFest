// // Define the NFT struct
// struct NFT {
//   id: u64,  // Unique identifier for the NFT
//   name: vector<u8>,  // Name of the NFT
//   description: vector<u8>,  // Description of the NFT
//   creator: address,  // Address of the NFT creator
// }

// // Manage NFTs resource
// resource NFTStore {
//   // Store a map of NFT ID to the NFT struct
//   nfts: map<u64, NFT>,

//   // Function to create a new NFT
//   public fun mint_nft(creator: address, name: vector<u8>, description: vector<u8>, // ... other arguments) : u64 {
//     let id = self.nfts.length() + 1;
//     let new_nft = NFT {
//       id: id,
//       name: name,
//       description: description,
//       creator: creator,
//       // ... set other attributes
//     };
//     self.nfts.insert(id, new_nft);
//     return id;  // Return the NFT ID
//   }

//   // Function to get details of an NFT by ID
//   public fun get_nft(id: u64): NFT {
//     return self.nfts[id];
//   }
// }

// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

// TODO: consider renaming this to `example_nft`
/// A minimalist example to demonstrate how to create an NFT like object
/// on Sui.
module suifest::suifest_nft {
    use sui::url::{Self, Url};
    use std::string;
    use sui::object::{Self, ID, UID};
    use sui::event;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    /// An example NFT that can be minted by anybody
    public struct DevNetNFT has key, store {
        id: UID,
        /// Name for the token
        name: string::String,
        /// Description of the token
        description: string::String,
        /// URL for the token
        url: Url,
        // TODO: allow custom attributes
    }

    public struct MintNFTEvent has copy, drop {
        // The Object ID of the NFT
        object_id: ID,
        // The creator of the NFT
        creator: address,
        // The name of the NFT
        name: string::String,
    }

    /// Create a new devnet_nft
    public entry fun mint(
        name: vector<u8>,
        description: vector<u8>,
        url: vector<u8>,
        ctx: &mut TxContext
    ) {
        let nft = DevNetNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            description: string::utf8(description),
            url: url::new_unsafe_from_bytes(url)
        };
        let sender = tx_context::sender(ctx);
        event::emit(MintNFTEvent {
            object_id: object::uid_to_inner(&nft.id),
            creator: sender,
            name: nft.name,
        });
        transfer::public_transfer(nft, sender);
    }

    /// Update the `description` of `nft` to `new_description`
    public entry fun update_description(
        nft: &mut DevNetNFT,
        new_description: vector<u8>,
    ) {
        nft.description = string::utf8(new_description)
    }

    /// Permanently delete `nft`
    public entry fun burn(nft: DevNetNFT) {
        let DevNetNFT { id, name: _, description: _, url: _ } = nft;
        object::delete(id)
    }

    /// Get the NFT's `name`
    public fun name(nft: &DevNetNFT): &string::String {
        &nft.name
    }

    /// Get the NFT's `description`
    public fun description(nft: &DevNetNFT): &string::String {
        &nft.description
    }

    /// Get the NFT's `url`
    public fun url(nft: &DevNetNFT): &Url {
        &nft.url
    }
}

#[test_only]
module nft::devnet_nftTests {
    use nft::devnet_nft::{Self, DevNetNFT};
    use sui::test_scenario as ts;
    use sui::transfer;
    use std::string;

    #[test]
    fun mint_transfer_update() {
        let addr1 = @0xA;
        let addr2 = @0xB;
        // create the NFT
        let scenario = ts::begin(addr1);
        {
            devnet_nft::mint(b"test", b"a test", b"https://www.sui.io", ts::ctx(&mut scenario))
        };
        // send it from A to B
        ts::next_tx(&mut scenario, addr1);
        {
            let nft = ts::take_from_sender<DevNetNFT>(&scenario);
            transfer::public_transfer(nft, addr2);
        };
        // update its description
        ts::next_tx(&mut scenario, addr2);
        {
            let nft = ts::take_from_sender<DevNetNFT>(&scenario);
            devnet_nft::update_description(&mut nft, b"a new description") ;
            assert!(*string::bytes(devnet_nft::description(&nft)) == b"a new description", 0);
            ts::return_to_sender(&scenario, nft);
        };
        // burn it
        ts::next_tx(&mut scenario, addr2);
        {
            let nft = ts::take_from_sender<DevNetNFT>(&scenario);
            devnet_nft::burn(nft)
        };
        ts::end(scenario);
    }
}
