import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js'

export interface Round {
    authority: PublicKey,
    mintCounter: number,
    nftBurnCounter: number,
    roundCloseTimestamp: number,
    roundBasicMintFee: number,
    roundIncrement: number,
    mainPoolVault: PublicKey,
    nftPoolVault: PublicKey,
    mintFeeVault: PublicKey,
    collection: PublicKey,
    bump: number,
}

export interface Key {
    nftMint: PublicKey,
    keyIndex: number,
    exited: number,
    bump: number
}