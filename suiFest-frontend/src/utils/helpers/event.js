import { TransactionBlock } from "@mysten/sui.js/transactions";
// import { PACKAGE_ID, SUI_CLIENT } from "./suiClient";
import { MIST_PER_SUI, SUI_CLOCK_OBJECT_ID } from "@mysten/sui.js/utils";
import {
  EVENT,
  PUBLIC_PACKAGE_ID,
  SUI_CLIENT,
  WALLET_ADDRESS,
} from "../../constants";
import getKeyPair from "./getKeyPair";
import generateZkLoginSignature from "./generateZKLogin";

// a service to interact with the smart contract using SUI SDK

export class EventService {
  async create_event(event) {
    const txb = new TransactionBlock();
    const txData = {
      // notes is name of contract, replace it
      target: `${PUBLIC_PACKAGE_ID}::suifest::Event`,
      arguments: [
        txb.pure.string(event[EVENT.TITLE]),
        txb.pure.string(event[EVENT.DESC]),
        txb.pure.string(event[EVENT.LOCATION]),
        txb.pure.string(event[EVENT.DATE]),
        txb.pure.u64(event[EVENT.NO_OF_ATTENDEES]),
        txb.pure.u64(event[EVENT.TICKET]),
      ],
    };

    console.log({ txData });
    return this.makeMoveCall(txData, txb);
  }

  // async tip({profileId, amountInSui}) {
  //     const txb = new TransactionBlock();
  //     let [coin] = txb.splitCoins(txb.gas, [amountInSui * Number(MIST_PER_SUI)]);

  //     const txData = {// notes is name of contract, replace it
  //         target: `${PACKAGE_ID}::profile::tip`,
  //         arguments: [
  //             txb.object(profileId),
  //             coin,
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async isFollowing({Arg0, Arg1}) {
  //     const txb = new TransactionBlock();
  //     const txData = {// notes is name of contract, replace it
  //         target: `${PACKAGE_ID}::profile::isFollowing`,
  //         arguments: [
  //             txb.pure.string(Arg0),
  //             txb.pure.string(Arg1),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async follow({profileId, profileCapId, profileIdFollow}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::follow`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //             txb.pure.string(profileIdFollow),
  //             txb.object(SUI_CLOCK_OBJECT_ID),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async unfollow({profileId, profileCapId, profileIdUnFollow}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::unfollow`,
  //         arguments: [
  //             txb.pure.string(profileId),
  //             txb.pure.string(profileCapId),
  //             txb.pure.string(profileIdUnFollow),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }
  // async withdraw_tip({ profileId, profileCapId, currentAccount }) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::withdraw_tip`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //         ]
  //     };
  //     //txb.transferObjects([coin], currentAccount);
  //     return this.makeMoveCall(txData, txb);
  // }

  // async set_username({profileId, profileCapId, username}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::set_username`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //             txb.pure.string(username),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async set_pfp({profileId, profileCapId, pfp}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::set_pfp`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //             txb.pure.string(pfp),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async set_bio({profileId, profileCapId, bio}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::set_bio`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //             txb.pure.string(bio),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async create_video({profileCapId, url, length}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::video::create_video`,
  //         arguments: [
  //             txb.object(profileCapId),
  //             txb.pure.string(url),
  //             txb.pure.u64(length),
  //             txb.object(SUI_CLOCK_OBJECT_ID),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async like({videoStatsId, profileCapId}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::video::like`,
  //         arguments: [
  //             txb.object(videoStatsId),
  //             txb.object(profileCapId),
  //             txb.object(SUI_CLOCK_OBJECT_ID),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async unlike({videoStatsId, profileCapId}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::video::unlike`,
  //         arguments: [
  //             txb.object(videoStatsId),
  //             txb.object(profileCapId),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async comment({videoStatsId, profileCapId, text}) {
  //     const txb = new TransactionBlock();
  //     const txData = {
  //         target: `${PACKAGE_ID}::video::comment`,
  //         arguments: [
  //             txb.object(videoStatsId),
  //             txb.object(profileCapId),
  //             txb.pure.string(text),
  //             txb.object(SUI_CLOCK_OBJECT_ID),
  //         ]
  //     };
  //     return this.makeMoveCall(txData, txb);
  // }

  // async getVideos() {
  //     const sender = AuthService.walletAddress();
  //     let ownedObjects = await SUI_CLIENT.getOwnedObjects({
  //         owner: sender
  //     });
  //     let ownedObjectsDetails = await Promise.all(ownedObjects.data.map(async (obj) => {
  //         if(obj.data)
  //             return await SUI_CLIENT.getObject({ id: obj.data.objectId, options: { showType: true, showContent: true } });
  //     }));
  //     /**return ownedObjectsDetails.filter(obj => {
  //         return `${PACKAGE_ID}::notes::Note` === obj.data && obj.data.type
  //     }).map(obj => { if (obj && obj.data && obj.data.content) obj.data.content['fields'] });*/
  // }

  // async delete_profile(profileId, profileCapId ) {
  //     const sender = AuthService.walletAddress();
  //     const txb = new TransactionBlock();
  //     txb.setSender(sender);
  //     const txData = {
  //         target: `${PACKAGE_ID}::profile::delete_profile`,
  //         arguments: [
  //             txb.object(profileId),
  //             txb.object(profileCapId),
  //         ]
  //     };
  //     await this.makeMoveCall(txData, txb);
  // }

  // async delete_comment({ videoStatsId, profileCapId, commentId }) {
  //     const sender = AuthService.walletAddress();
  //     const txb = new TransactionBlock();
  //     txb.setSender(sender);
  //     const txData = {
  //         target: `${PACKAGE_ID}::video::delete_comment`,
  //         arguments: [
  //             txb.object(videoStatsId),
  //             txb.object(profileCapId),
  //             txb.object(commentId),
  //         ]
  //     };
  //     await this.makeMoveCall(txData, txb);
  // }

  async makeMoveCall(txData, txb) {
    const keypair = getKeyPair();

    const sender =
      window.sessionStorage.getItem(WALLET_ADDRESS) ||
      "0xbc50a02252cd66a5028515cd26326329a7057852e58f67dc68ce8dfe75ade4de";
    txb.setSender(sender);
    txb.setGasBudget(100000000);
    console.log({ gas: txb.gas });
    const gasAmount = txb.gas / 2;
    // console.log({ gas:  txb.splitCoins(txb.gas, [100]) });
    const reference_gas_price = await SUI_CLIENT.getReferenceGasPrice();
    SUI_CLIENT.
    console.log({ reference_gas_price });
    // console.log({gasCoins})
    // const [coin] = txb.splitCoins(txb.gas, [1000000000]);
    // const [coins] = trx.splitCoins(trx.gas, [trx.pure(convertSUItoMIST(gasFee))]);
    // txb.transferObjects([coin], txb.pure(sender));
    txb.moveCall(txData);

    const { bytes, signature: userSignature } = await txb.sign({
      client: SUI_CLIENT,
      signer: keypair,
    });
    // coin && txb.transferObjects([coin], sender);
    const zkLoginSignature = await generateZkLoginSignature(userSignature);
    console.log({ zkLoginSignature });
    const transaction1 = SUI_CLIENT.executeTransactionBlock({
      transactionBlock: bytes,
      signature: zkLoginSignature,
    });

    console.log("Create event ======", transaction1);
    return transaction1;
  }

  // async getSuiMessageCall() {
  //     const keypair = AuthService.getEd25519Keypair();
  //     const sender = AuthService.walletAddress();
  //     const txb = new TransactionBlock();
  //     txb.setSender(sender);
  //     const { bytes, signature: userSignature } = await txb.sign({
  //         client: SUI_CLIENT,
  //         signer: keypair,
  //     });
  //     const zkLoginSignature = await AuthService.generateZkLoginSignature(userSignature);
  //     return { signature: zkLoginSignature };
  // }
}
