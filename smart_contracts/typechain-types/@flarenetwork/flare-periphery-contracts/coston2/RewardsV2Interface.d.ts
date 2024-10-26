/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventData, PastEventOptions } from "web3-eth-contract";

export interface RewardsV2InterfaceContract
  extends Truffle.Contract<RewardsV2InterfaceInstance> {
  "new"(meta?: Truffle.TransactionDetails): Promise<RewardsV2InterfaceInstance>;
}

type AllEvents = never;

export interface RewardsV2InterfaceInstance extends Truffle.ContractInstance {
  active(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

  claim: {
    (
      _rewardOwner: string,
      _recipient: string,
      _rewardEpochId: number | BN | string,
      _wrap: boolean,
      _proofs: {
        merkleProof: string[];
        body: {
          rewardEpochId: number | BN | string;
          beneficiary: string;
          amount: number | BN | string;
          claimType: number | BN | string;
        };
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<Truffle.TransactionResponse<AllEvents>>;
    call(
      _rewardOwner: string,
      _recipient: string,
      _rewardEpochId: number | BN | string,
      _wrap: boolean,
      _proofs: {
        merkleProof: string[];
        body: {
          rewardEpochId: number | BN | string;
          beneficiary: string;
          amount: number | BN | string;
          claimType: number | BN | string;
        };
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;
    sendTransaction(
      _rewardOwner: string,
      _recipient: string,
      _rewardEpochId: number | BN | string,
      _wrap: boolean,
      _proofs: {
        merkleProof: string[];
        body: {
          rewardEpochId: number | BN | string;
          beneficiary: string;
          amount: number | BN | string;
          claimType: number | BN | string;
        };
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<string>;
    estimateGas(
      _rewardOwner: string,
      _recipient: string,
      _rewardEpochId: number | BN | string,
      _wrap: boolean,
      _proofs: {
        merkleProof: string[];
        body: {
          rewardEpochId: number | BN | string;
          beneficiary: string;
          amount: number | BN | string;
          claimType: number | BN | string;
        };
      }[],
      txDetails?: Truffle.TransactionDetails
    ): Promise<number>;
  };

  getNextClaimableRewardEpochId(
    _rewardOwner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<BN>;

  getRewardEpochIdsWithClaimableRewards(
    txDetails?: Truffle.TransactionDetails
  ): Promise<{ 0: BN; 1: BN }>;

  getStateOfRewards(
    _rewardOwner: string,
    txDetails?: Truffle.TransactionDetails
  ): Promise<
    {
      rewardEpochId: BN;
      beneficiary: string;
      amount: BN;
      claimType: BN;
      initialised: boolean;
    }[][]
  >;

  methods: {
    active(txDetails?: Truffle.TransactionDetails): Promise<boolean>;

    claim: {
      (
        _rewardOwner: string,
        _recipient: string,
        _rewardEpochId: number | BN | string,
        _wrap: boolean,
        _proofs: {
          merkleProof: string[];
          body: {
            rewardEpochId: number | BN | string;
            beneficiary: string;
            amount: number | BN | string;
            claimType: number | BN | string;
          };
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<Truffle.TransactionResponse<AllEvents>>;
      call(
        _rewardOwner: string,
        _recipient: string,
        _rewardEpochId: number | BN | string,
        _wrap: boolean,
        _proofs: {
          merkleProof: string[];
          body: {
            rewardEpochId: number | BN | string;
            beneficiary: string;
            amount: number | BN | string;
            claimType: number | BN | string;
          };
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<BN>;
      sendTransaction(
        _rewardOwner: string,
        _recipient: string,
        _rewardEpochId: number | BN | string,
        _wrap: boolean,
        _proofs: {
          merkleProof: string[];
          body: {
            rewardEpochId: number | BN | string;
            beneficiary: string;
            amount: number | BN | string;
            claimType: number | BN | string;
          };
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<string>;
      estimateGas(
        _rewardOwner: string,
        _recipient: string,
        _rewardEpochId: number | BN | string,
        _wrap: boolean,
        _proofs: {
          merkleProof: string[];
          body: {
            rewardEpochId: number | BN | string;
            beneficiary: string;
            amount: number | BN | string;
            claimType: number | BN | string;
          };
        }[],
        txDetails?: Truffle.TransactionDetails
      ): Promise<number>;
    };

    getNextClaimableRewardEpochId(
      _rewardOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<BN>;

    getRewardEpochIdsWithClaimableRewards(
      txDetails?: Truffle.TransactionDetails
    ): Promise<{ 0: BN; 1: BN }>;

    getStateOfRewards(
      _rewardOwner: string,
      txDetails?: Truffle.TransactionDetails
    ): Promise<
      {
        rewardEpochId: BN;
        beneficiary: string;
        amount: BN;
        claimType: BN;
        initialised: boolean;
      }[][]
    >;
  };

  getPastEvents(event: string): Promise<EventData[]>;
  getPastEvents(
    event: string,
    options: PastEventOptions,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
  getPastEvents(event: string, options: PastEventOptions): Promise<EventData[]>;
  getPastEvents(
    event: string,
    callback: (error: Error, event: EventData) => void
  ): Promise<EventData[]>;
}