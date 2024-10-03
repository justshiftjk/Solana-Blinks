import {
    Transaction,
    PublicKey
} from '@solana/web3.js';
import { FOMO_PROGRAM_ID, adminKeypair, adminWallet, connection, program, provider, ROUND_SEED, RPC } from './config';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { das } from '@metaplex-foundation/mpl-core-das';
import { publicKey } from '@metaplex-foundation/umi';
import { BN } from "bn.js";
import { Round, Key } from './types';

// Address of the deployed program.
export const addAdminSignAndConfirm = async (tx: Transaction) => {

    // Sign the transaction with admin's Keypair
    tx = await adminWallet.signTransaction(tx);

    const sTx = tx.serialize();

    // Send the raw transaction
    const options = {
        commitment: 'confirmed',
        skipPreflight: false,
    };
    // Confirm the transaction
    const signature = await connection.sendRawTransaction(sTx, options);
    await connection.confirmTransaction(signature, "confirmed");

    console.log("Transaction confirmed:", signature);
}

export const getPDA = async (
    seeds: Array<Buffer | Uint8Array>,
    programId: PublicKey
) => {
    return PublicKey.findProgramAddressSync(seeds, programId);
};

export const getAssociatedTokenAccount = async (
    ownerPubkey: PublicKey,
    mintPk: PublicKey
): Promise<PublicKey> => {
    let associatedTokenAccountPubkey = (PublicKey.findProgramAddressSync(
        [
            ownerPubkey.toBuffer(),
            TOKEN_PROGRAM_ID.toBuffer(),
            mintPk.toBuffer(), // mint address
        ],
        ASSOCIATED_TOKEN_PROGRAM_ID
    ))[0];

    return associatedTokenAccountPubkey;
}

export const getRoundKeyState = async () => {

    const [roundAccount] = await getPDA(
        [Buffer.from("round"), new BN(ROUND_SEED).toArrayLike(Buffer, "le", 8)],
        FOMO_PROGRAM_ID
    );

    try {
        let roundState = await program.account.round.fetch(roundAccount, "confirmed") as unknown as Round;

        const [currentKeyAccount] = await getPDA(
            [Buffer.from("key"), roundAccount.toBuffer(), new BN(Number(roundState.mintCounter)).toArrayLike(Buffer, "le", 8)],
            FOMO_PROGRAM_ID
        );

        let currentAsset = await program.account.nftKey.fetch(currentKeyAccount, "confirmed") as unknown as Key;

        return {
            roundState,
            currentAsset,
            roundAccount
        };
    } catch (error) {
        return null
    }
}

export const getCreateKeyState = async () => {

    const [roundAccount] = await getPDA(
        [Buffer.from("round"), new BN(ROUND_SEED).toArrayLike(Buffer, "le", 8)],
        FOMO_PROGRAM_ID
    );

    try {
        let roundState = await program.account.round.fetch(roundAccount, "confirmed") as unknown as Round;

        const [keyAccount] = await getPDA(
            [Buffer.from("key"), roundAccount.toBuffer(), new BN(Number(roundState.mintCounter) + 1).toArrayLike(Buffer, "le", 8)],
            FOMO_PROGRAM_ID
        );

        const [currentKeyAccount] = await getPDA(
            [Buffer.from("key"), roundAccount.toBuffer(), new BN(Number(roundState.mintCounter)).toArrayLike(Buffer, "le", 8)],
            FOMO_PROGRAM_ID
        );

        let currentAsset = await program.account.nftKey.fetch(currentKeyAccount, "confirmed") as unknown as Key;

        return {
            roundState,
            currentAsset,
            keyAccount,
            currentKeyAccount,
            roundAccount
        };
    } catch (error) {
        return null
    }
}

export const getMintOwner = async (mint: PublicKey) => {
    try {
        const umi = createUmi(RPC).use(dasApi());
        const assetId = publicKey(mint);
        const asset = await das.getAsset(umi, assetId);
        return asset.owner;
    } catch (error) {
        return null
    }

}


export const getNFTsByOwner = async (owner: PublicKey, authority: PublicKey, dataSize: number) => {
    try {
        const umi = createUmi(RPC).use(dasApi());

        const assets = await umi.rpc.searchAssets({
            owner: publicKey(owner),
            frozen: false,
            authority: publicKey(authority),
            interface: 'MplCoreAsset',
            burnt: false
        });

        let keyAccounts = await connection.getProgramAccounts(
            FOMO_PROGRAM_ID,
            {
                filters: [{
                    dataSize,
                }],
            }
        );

        let keyAccount: PublicKey = null;
        let nftMint: PublicKey = null;

        if (assets.total > 0) {
            for (let idx = 0; idx < keyAccounts.length; idx++) {
                const data = keyAccounts[idx].account.data;
                const nft_mint = new PublicKey(data.subarray(8, 40));
                const exited = data[48];
                if (!exited) {
                    let equalItem = assets.items.filter((item) => item.id == nft_mint.toBase58());
                    if (equalItem.length > 0) {
                        keyAccount = keyAccounts[idx].pubkey;
                        nftMint = nft_mint;
                        break;
                    }
                }
            }
        }

        return {
            keyAccount,
            nftMint
        };
    } catch (error) {
        return null
    }

}




