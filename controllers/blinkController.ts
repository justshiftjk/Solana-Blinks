import { Request, Response } from 'express';
import * as anchor from '@project-serum/anchor';
import {
  getRoundKeyState,
  getCreateKeyState,
  getMintOwner,
  getAssociatedTokenAccount,
  getNFTsByOwner
} from "../program/script";
import {
  BASIC_MINT_FEE,
  TOKEN_MINT,
  connection,
  POOL_ADDRESS,
  program,
  provider,
  DYNAMIC_VAULT_PROGRAM_ID,
  SPL_NOOP_PROGRAM_ID,
  MPL_CORE,
  KET_ACCOUNT_SIZE
} from '../program/config';
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  createPostResponse,
  ActionError,
  createActionHeaders
} from "@solana/actions";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
  Keypair,
  ComputeBudgetProgram
} from "@solana/web3.js";
import AmmImpl, { PROGRAM_ID } from '@mercurial-finance/dynamic-amm-sdk';
import { TOKEN_PROGRAM_ID, NATIVE_MINT } from '@solana/spl-token';
import { IDL } from "../program/idl";

const getRoundInfo = async () => {
  try {
    let timeFormatted = `0 hrs 0 min`;
    const roundKeyState = await getRoundKeyState();
    const getCurrentTimeStamp = Date.now();
    const timeDiff = Number(roundKeyState.roundState.roundCloseTimestamp) * 1000 - getCurrentTimeStamp;
    if (timeDiff > 0) {
      const diffInSeconds = Math.floor(timeDiff / 1000);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor((diffInSeconds % 3600) / 60);
      const seconds = diffInSeconds % 60;
      timeFormatted = `${String(hours).padStart(2, '0')} hrs ${String(minutes).padStart(2, '0')} min`;
    }
    const mintFee = (BASIC_MINT_FEE + (Number(roundKeyState.roundState.mintCounter) + 1) * Number(roundKeyState.roundState.roundIncrement)) / LAMPORTS_PER_SOL;
    const tokenBalance = await connection.getTokenAccountBalance(roundKeyState.roundState.mainPoolVault);
    const mintOwner = await getMintOwner(roundKeyState.currentAsset.nftMint);

    return {
      mint: mintFee,
      time: timeFormatted,
      tokenBalance,
      master: mintOwner
    };
  } catch (error) {
    return null
  }
}

const getBurnInfo = async () => {
  try {
    const roundKeyState = await getRoundKeyState();
    const tokenBalance = await connection.getTokenAccountBalance(roundKeyState.roundState.nftPoolVault);
    const burnedCount = Number(roundKeyState.roundState.nftBurnCounter);
    const mintCount = Number(roundKeyState.roundState.mintCounter);

    return {
      tokenBalance,
      burnedCount,
      mintCount
    };
  } catch (error) {
    return null
  }
}

const headers = createActionHeaders({
  chainId: "devnet", // or chainId: "devnet"
  actionVersion: "1.6.4", // the desired spec version
});

export async function mintBlinkURL(req: Request, res: Response) {
  res.set(headers);
  try {
    const info = await getRoundInfo();

    const payload: ActionGetResponse = {
      icon: 'https://purple-quickest-catshark-409.mypinata.cloud/ipfs/QmQPdc222VY46yLB25AHyAbAna9nLQ1YP5RGC5ewPvisfy',
      title: `Mint the master key to win a Prize Pool of ${(info.tokenBalance.value.uiAmount).toFixed(2)}SEND`,
      description: `The wallet to mint the NFT at the end of the game wins... \n\nCurrent Prize Pool: ${(info.tokenBalance.value.uiAmount).toFixed(2)}SEND \nTime Left for the Game to end: ${info.time} \nCurrent Master Key holder: ${info.master} \n \nRefresh the page to update the data`,
      label: "Mint",
      links: {
        actions: [
          {
            label: `Mint for ${(info.mint + 0.0055).toFixed(2)} SOL`,
            href: `/api/actions${req.url}`,
          }
        ]
      },
      disabled: info.time == '0 hrs 0 min' ? true : false
    }
    return res.json(payload);
  } catch (error) {
    return res.status(400).json({
      message: `Failed to prepare transaction`,
    } as ActionError)
  }
}

export async function mintMasterKey(req: Request, res: Response) {
  res.set(headers);

  try {
    const body: ActionPostRequest = await req.body;

    let account: PublicKey;

    if (body.account) {
      account = new PublicKey(body.account);
    } else {
      return res.status(400).json({
        error: "Account is required"
      })
    }

    const createKeyState = await getCreateKeyState();

    const getCurrentTimeStamp = Date.now();
    const timeDiff = Number(createKeyState.roundState.roundCloseTimestamp) * 1000 - getCurrentTimeStamp;

    if (timeDiff <= 0) {
      throw new Error("The winner has already been decided!");
    }

    // Time difference calculate
    const pool: any = await AmmImpl.create(provider.connection, POOL_ADDRESS);

    const poolState = pool.poolState;

    const remainingAccounts = pool.swapCurve.getRemainingAccounts();

    const newMint = Keypair.generate();

    const tokenAccount = await getAssociatedTokenAccount(account, NATIVE_MINT);

    const tx = new Transaction();

    const ix = await program.methods
      .createKey()
      .accounts({
        authority: account,
        asset: newMint.publicKey,
        currentAsset: createKeyState.currentAsset.nftMint,
        roundAccount: createKeyState.roundAccount,
        collection: createKeyState.roundState.collection,
        keyAccount: createKeyState.keyAccount,
        currentKeyAccount: createKeyState.currentKeyAccount,
        mintFeeVault: createKeyState.roundState.mintFeeVault,
        nftPoolVault: createKeyState.roundState.nftPoolVault,
        mainPoolVault: createKeyState.roundState.mainPoolVault,
        pool: POOL_ADDRESS,
        aVault: poolState.aVault,
        bVault: poolState.bVault,
        aTokenVault: pool.vaultA.tokenVaultPda,
        bTokenVault: pool.vaultB.tokenVaultPda,
        aVaultLpMint: pool.vaultA.vaultState.lpMint,
        bVaultLpMint: pool.vaultB.vaultState.lpMint,
        aVaultLp: poolState.aVaultLp,
        bVaultLp: poolState.bVaultLp,
        adminTokenFee: poolState.protocolTokenBFee,
        userSourceToken: tokenAccount,
        wsolMint: NATIVE_MINT,
        vaultProgram: DYNAMIC_VAULT_PROGRAM_ID,
        tokenProgram: TOKEN_PROGRAM_ID,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        mplCore: MPL_CORE,
        dynamicAmmProgram: PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .remainingAccounts(remainingAccounts)
      .transaction();
    tx.add(ix);
    tx.add(ComputeBudgetProgram.setComputeUnitLimit({ units: 1_000_000 }));

    const block = await connection.getLatestBlockhash();
    tx.feePayer = account;
    tx.recentBlockhash = block.blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: tx,
        links: {
          next: {
            type: 'post',
            href: '/api/actions/mint-success'
            // action: {
            //   type: "completed",
            //   icon: 'https://purple-quickest-catshark-409.mypinata.cloud/ipfs/QmXEFnXdMLeSCtzEk8gaiEcDq18DncZ8aRduSNmDgUa2kr',
            //   title: `Master Key minted successfully`,
            //   description: `You have successfully minted the master key which unclocks worth of treasure. If no one mints an NFT in next 24hrs you will win the whole prize pool. \n\nRefresh the page to update to data.`,
            //   label: "Completed",
            // }
          }
        }
      },
      signers: [newMint],
      options: { commitment: 'finalized' }
    })

    return res.json(payload);
  } catch (error: any) {
    return res.status(400).json({
      message: `${error.message}`,
    } as ActionError)
  }
}

export async function mintSuccess(req: Request, res: Response) {
  res.set(headers);

  try {
    const info = await getRoundInfo();

    const payload: ActionGetResponse = {
      icon: 'https://purple-quickest-catshark-409.mypinata.cloud/ipfs/QmXEFnXdMLeSCtzEk8gaiEcDq18DncZ8aRduSNmDgUa2kr',
      title: `Master Key minted successfully`,
      description: `You have successfully minted the master key which unclocks ${(info.tokenBalance.value.uiAmount).toFixed(2)}SEND worth of treasure. If no one mints an NFT in next 24hrs you will win the whole prize pool.\n\nCurrent Prize Pool: ${(info.tokenBalance.value.uiAmount).toFixed(2)}SEND \nTime Left for the Game to end: ${info.time} \nCurrent Master Key holer: ${info.master} \n \nRefresh the page to update the data`,
      label: "Mint",
      links: {
        actions: [
          {
            label: `Mint another one for ${(info.mint + 0.0055).toFixed(2)} SOL`,
            href: `/api/actions/mint`
          }
        ],
      }
    }
    return res.json(payload);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message
    } as ActionError)
  }
}

export async function burnBlinkURL(req: Request, res: Response) {
  res.set(headers);

  try {
    const info = await getBurnInfo();

    const payload: ActionGetResponse = {
      icon: 'https://magenta-official-flea-228.mypinata.cloud/ipfs/QmbNA1qg3gd9VtjnNYK4UXXoDZtuYKi11C29NJWxbfsvqZ',
      title: `Burn the collector key to claim ${(info.tokenBalance.value.uiAmount / (info.mintCount - info.burnedCount)).toFixed(2)}SEND from the NFT Pool `,
      description: `\nCurrent NFT Pool: ${(info.tokenBalance.value.uiAmount).toFixed(2)} SEND \nCurrent Minted NFT: ${info.mintCount}\nCurrent Burned NFT: ${info.burnedCount}\n\nRefresh the page to update the data`,
      label: "Claim",
      links: {
        actions: [
          {
            label: `Burn for ${(info.tokenBalance.value.uiAmount / (info.mintCount - info.burnedCount)).toFixed(2)}SEND`,
            href: `/api/actions${req.url}`
          }
        ],
      }
    }
    return res.json(payload);
  } catch (error) {
    return res.status(400).json({
      message: `Failed to prepare transaction`,
    } as ActionError)
  }
}

export async function burnCollecterKey(req: Request, res: Response) {
  res.set(headers);

  try {
    const body: ActionPostRequest = await req.body;

    let account: PublicKey;

    if (body.account) {
      account = new PublicKey(body.account);
    } else {
      return res.status(400).json({
        error: "Account is required"
      })
    }

    const roundKeyState = await getRoundKeyState();

    const burnMint = await getNFTsByOwner(account, roundKeyState.roundAccount, KET_ACCOUNT_SIZE);

    if (burnMint.keyAccount === null) {
      throw new Error("You dont have claimable NFT!");
    }

    const tokenAccount = await getAssociatedTokenAccount(account, TOKEN_MINT);

    const info = await getBurnInfo();

    const tx = new Transaction();

    const ix = await program.methods
      .burnKey()
      .accounts({
        authority: account,
        authorityAta: tokenAccount,
        roundAccount: roundKeyState.roundAccount,
        collection: roundKeyState.roundState.collection,
        asset: burnMint.nftMint,
        keyAccount: burnMint.keyAccount,
        nftPoolVault: roundKeyState.roundState.nftPoolVault,
        tokenMint: TOKEN_MINT,
        tokenProgram: TOKEN_PROGRAM_ID,
        associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        mplCore: MPL_CORE,
        systemProgram: anchor.web3.SystemProgram.programId
      })
      .transaction();

    tx.add(ix);

    const block = await connection.getLatestBlockhash();
    tx.feePayer = account;
    tx.recentBlockhash = block.blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction: tx,
        links: {
          next: {
            type: 'inline',
            action: {
              type: "completed",
              icon: 'https://blue-dear-woodpecker-981.mypinata.cloud/ipfs/QmbNA1qg3gd9VtjnNYK4UXXoDZtuYKi11C29NJWxbfsvqZ',
              title: `You burned the collection key.`,
              description: `Successfully burned the collection key claiming ${(info.tokenBalance.value.uiAmount / (info.mintCount - info.burnedCount)).toFixed(2)}SEND. \n\nRefresh the page to update to data.`,
              label: "Completed",
            }
          }
        }
      },
      signers: [],
      options: { commitment: 'confirmed' }
    })
    return res.json(payload);
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    } as ActionError)
  }
}

export const OPTIONS = async () => Response.json(null, { headers });