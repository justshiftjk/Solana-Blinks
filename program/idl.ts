export type FomoContract = {
  "version": "0.1.0",
  "name": "fomo_contract",
  "instructions": [
    {
      "name": "createRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, typically the user initiating the transaction"
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The collection account, representing the NFT collection authority"
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The `Round` account initialized by this instruction, used to store round details"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The SPL token program"
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The MPL Core program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Solana system program"
          ]
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createVaults",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account must match the `authority` field in the `round_account`."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The `round_account` storing all necessary round data, derived using a seed and bump."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint for the vaults to be created."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault for mint fee tokens, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault for NFTs, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Main vault for tokens, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program required for token-related operations."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program, required for initializing accounts and managing lamports."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "startRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority who initiates the transaction."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer representing the new asset to be created."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account which tracks the minting round information."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection to which the asset belongs."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The account representing the newly created key."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vaults for mintfee, nftpool, and mainpool, respectively."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token transfers."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional log wrapper program for SPL Noop."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "MPL Core program for managing assets."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for standard Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "updateIncrement",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority account, which must match the round account's authority.",
            "The authority is responsible for making updates to the round account."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account that is being updated.",
            "This account is initialized with a PDA and is mutable for updates."
          ]
        }
      ],
      "args": [
        {
          "name": "incrementAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createKey",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority who initiates the transaction."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer representing the new asset to be created."
          ]
        },
        {
          "name": "currentAsset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Existing asset account; should match the `nft_mint` of the current key account."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account which tracks the minting round information."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection to which the asset belongs."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The account representing the newly created key."
          ]
        },
        {
          "name": "currentKeyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The current key account for the asset."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vaults for mintfee, nftpool, and mainpool, respectively."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSourceToken",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Authority's token account associated with the token mint.",
            "If the account does not exist, it will be initialized."
          ]
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of the tokens associated with the round."
          ]
        },
        {
          "name": "vaultProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token transfers."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional log wrapper program for SPL Noop."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "MPL Core program for managing assets."
          ]
        },
        {
          "name": "dynamicAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for standard Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "burnKey",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, must be a signer."
          ]
        },
        {
          "name": "authorityAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Authority's token account associated with the asset mint.",
            "If the account does not exist, it will be initialized."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account storing round-specific data, constrained by seed and bump."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection account associated with the round."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Asset (NFT) to be burned, checked against the key account's mint."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Key account representing the NFT being burned, constrained by seed and bump."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault holding the NFT pool for the round."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of the tokens associated with the round."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program for handling token operations."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional SPL Noop program for logging events."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Metaplex Core program used for burning the NFT."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System Program for creating and transferring lamports."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "winnerClaim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority of the round, must match the `round_account`'s authority."
          ]
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Winner's account. This is unchecked but will be validated later in the logic."
          ]
        },
        {
          "name": "winnerAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Winner's associated token account. This will be initialized if needed."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account, derived using seeds and bump."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Asset account (NFT mint), validated to match the key account's mint."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Key account for the NFT, constrained by the round's mint counter and seeds."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint for the asset being claimed."
          ]
        },
        {
          "name": "mainPoolVault",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Vault for tokens, owned by the `round_account`."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token-related operations."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated token program required for creating associated token accounts."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for managing lamports and account creation."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "feeClaim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, must match the authority of the round"
          ]
        },
        {
          "name": "authorityAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Associated Token Account (ATA) of the authority for the token mint",
            "Constraints ensure the mint matches and the owner is the authority."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account, must be signed by the authority"
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint associated with the round"
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The NFT pool vault, which holds NFTs for the round, must match the vault in the round account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The SPL Token program"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Solana system program"
          ]
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "round",
      "docs": [
        "Struct representing a round in the system, containing various",
        "parameters for tracking the state and operations within the round."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority or admin that has control over this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "seed",
            "docs": [
              "A unique seed used for generating new rounds."
            ],
            "type": "u64"
          },
          {
            "name": "mintCounter",
            "docs": [
              "Counter for the number of NFTs minted in this round."
            ],
            "type": "u64"
          },
          {
            "name": "nftBurnCounter",
            "docs": [
              "Counter for the number of NFTs burned in this round."
            ],
            "type": "u64"
          },
          {
            "name": "roundCloseTimestamp",
            "docs": [
              "A slot indicating when the round will close (24-hour window)."
            ],
            "type": "u64"
          },
          {
            "name": "roundBasicMintFee",
            "docs": [
              "The base fee required to mint an NFT during this round."
            ],
            "type": "u64"
          },
          {
            "name": "roundIncrement",
            "docs": [
              "The increment value for fees or other progressive parameters."
            ],
            "type": "u64"
          },
          {
            "name": "mainPoolVault",
            "docs": [
              "Vault holding the main pool for this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "nftPoolVault",
            "docs": [
              "Vault holding NFTs associated with this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "mintFeeVault",
            "docs": [
              "Vault for collecting minting fees in this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "collection",
            "docs": [
              "The public key of the NFT collection associated with this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "The bump seed for the PDA (Program Derived Address) of this round."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "nftKey",
      "docs": [
        "Struct representing an NFT key, containing the mint information,",
        "indexing details, and other metadata associated with the key."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "docs": [
              "The public key of the NFT mint associated with this key."
            ],
            "type": "publicKey"
          },
          {
            "name": "keyIndex",
            "docs": [
              "Index of the key, used for uniquely identifying it within a collection or system."
            ],
            "type": "u64"
          },
          {
            "name": "exited",
            "docs": [
              "A flag to indicate whether this key has exited or been deactivated (0 = active, 1 = exited)."
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for Program Derived Address (PDA) associated with this key."
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidKeyAccount",
      "msg": "Invalid account key"
    },
    {
      "code": 6001,
      "name": "RoundStarted",
      "msg": "Round already started"
    },
    {
      "code": 6002,
      "name": "RoundOver",
      "msg": "Round over"
    },
    {
      "code": 6003,
      "name": "RoundNotOver",
      "msg": "Round not over"
    },
    {
      "code": 6004,
      "name": "InvalidAsset",
      "msg": "Invalid Asset"
    },
    {
      "code": 6005,
      "name": "CalculationError",
      "msg": "An error occurred during calculation."
    },
    {
      "code": 6006,
      "name": "DivisionError",
      "msg": "An error occurred during division, likely division by zero."
    },
    {
      "code": 6007,
      "name": "InvalidOwner",
      "msg": "Doesn't matched with token owner"
    }
  ]
};

export const IDL: FomoContract = {
  "version": "0.1.0",
  "name": "fomo_contract",
  "instructions": [
    {
      "name": "createRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, typically the user initiating the transaction"
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The collection account, representing the NFT collection authority"
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The `Round` account initialized by this instruction, used to store round details"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The SPL token program"
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The MPL Core program"
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Solana system program"
          ]
        }
      ],
      "args": [
        {
          "name": "seed",
          "type": "u64"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "createVaults",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account must match the `authority` field in the `round_account`."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The `round_account` storing all necessary round data, derived using a seed and bump."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint for the vaults to be created."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault for mint fee tokens, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault for NFTs, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Main vault for tokens, initialized and owned by the `round_account`."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program required for token-related operations."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program, required for initializing accounts and managing lamports."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "startRound",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority who initiates the transaction."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer representing the new asset to be created."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account which tracks the minting round information."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection to which the asset belongs."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The account representing the newly created key."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vaults for mintfee, nftpool, and mainpool, respectively."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token transfers."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional log wrapper program for SPL Noop."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "MPL Core program for managing assets."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for standard Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "updateIncrement",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority account, which must match the round account's authority.",
            "The authority is responsible for making updates to the round account."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account that is being updated.",
            "This account is initialized with a PDA and is mutable for updates."
          ]
        }
      ],
      "args": [
        {
          "name": "incrementAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "createKey",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "The authority who initiates the transaction."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Signer representing the new asset to be created."
          ]
        },
        {
          "name": "currentAsset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Existing asset account; should match the `nft_mint` of the current key account."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account which tracks the minting round information."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection to which the asset belongs."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The account representing the newly created key."
          ]
        },
        {
          "name": "currentKeyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The current key account for the asset."
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vaults for mintfee, nftpool, and mainpool, respectively."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mainPoolVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pool",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bTokenVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLpMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "aVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bVaultLp",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "adminTokenFee",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "userSourceToken",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Authority's token account associated with the token mint.",
            "If the account does not exist, it will be initialized."
          ]
        },
        {
          "name": "wsolMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of the tokens associated with the round."
          ]
        },
        {
          "name": "vaultProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token transfers."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional log wrapper program for SPL Noop."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "MPL Core program for managing assets."
          ]
        },
        {
          "name": "dynamicAmmProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for standard Solana operations."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "burnKey",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, must be a signer."
          ]
        },
        {
          "name": "authorityAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Authority's token account associated with the asset mint.",
            "If the account does not exist, it will be initialized."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Round account storing round-specific data, constrained by seed and bump."
          ]
        },
        {
          "name": "collection",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Collection account associated with the round."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Asset (NFT) to be burned, checked against the key account's mint."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Key account representing the NFT being burned, constrained by seed and bump."
          ]
        },
        {
          "name": "nftPoolVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Vault holding the NFT pool for the round."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Mint of the tokens associated with the round."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program for handling token operations."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "logWrapper",
          "isMut": false,
          "isSigner": false,
          "isOptional": true,
          "docs": [
            "Optional SPL Noop program for logging events."
          ]
        },
        {
          "name": "mplCore",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Metaplex Core program used for burning the NFT."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System Program for creating and transferring lamports."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "winnerClaim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority of the round, must match the `round_account`'s authority."
          ]
        },
        {
          "name": "winner",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Winner's account. This is unchecked but will be validated later in the logic."
          ]
        },
        {
          "name": "winnerAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Winner's associated token account. This will be initialized if needed."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account, derived using seeds and bump."
          ]
        },
        {
          "name": "asset",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Asset account (NFT mint), validated to match the key account's mint."
          ]
        },
        {
          "name": "keyAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Key account for the NFT, constrained by the round's mint counter and seeds."
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint for the asset being claimed."
          ]
        },
        {
          "name": "mainPoolVault",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Vault for tokens, owned by the `round_account`."
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Token program used for token-related operations."
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated token program required for creating associated token accounts."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "System program for managing lamports and account creation."
          ]
        }
      ],
      "args": []
    },
    {
      "name": "feeClaim",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true,
          "docs": [
            "Authority account, must match the authority of the round"
          ]
        },
        {
          "name": "authorityAta",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "Associated Token Account (ATA) of the authority for the token mint",
            "Constraints ensure the mint matches and the owner is the authority."
          ]
        },
        {
          "name": "roundAccount",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The round account, must be signed by the authority"
          ]
        },
        {
          "name": "tokenMint",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The token mint associated with the round"
          ]
        },
        {
          "name": "mintFeeVault",
          "isMut": true,
          "isSigner": false,
          "docs": [
            "The NFT pool vault, which holds NFTs for the round, must match the vault in the round account"
          ]
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The SPL Token program"
          ]
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "Associated Token Program for creating associated token accounts."
          ]
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false,
          "docs": [
            "The Solana system program"
          ]
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "round",
      "docs": [
        "Struct representing a round in the system, containing various",
        "parameters for tracking the state and operations within the round."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "docs": [
              "The authority or admin that has control over this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "seed",
            "docs": [
              "A unique seed used for generating new rounds."
            ],
            "type": "u64"
          },
          {
            "name": "mintCounter",
            "docs": [
              "Counter for the number of NFTs minted in this round."
            ],
            "type": "u64"
          },
          {
            "name": "nftBurnCounter",
            "docs": [
              "Counter for the number of NFTs burned in this round."
            ],
            "type": "u64"
          },
          {
            "name": "roundCloseTimestamp",
            "docs": [
              "A slot indicating when the round will close (24-hour window)."
            ],
            "type": "u64"
          },
          {
            "name": "roundBasicMintFee",
            "docs": [
              "The base fee required to mint an NFT during this round."
            ],
            "type": "u64"
          },
          {
            "name": "roundIncrement",
            "docs": [
              "The increment value for fees or other progressive parameters."
            ],
            "type": "u64"
          },
          {
            "name": "mainPoolVault",
            "docs": [
              "Vault holding the main pool for this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "nftPoolVault",
            "docs": [
              "Vault holding NFTs associated with this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "mintFeeVault",
            "docs": [
              "Vault for collecting minting fees in this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "collection",
            "docs": [
              "The public key of the NFT collection associated with this round."
            ],
            "type": "publicKey"
          },
          {
            "name": "bump",
            "docs": [
              "The bump seed for the PDA (Program Derived Address) of this round."
            ],
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "nftKey",
      "docs": [
        "Struct representing an NFT key, containing the mint information,",
        "indexing details, and other metadata associated with the key."
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nftMint",
            "docs": [
              "The public key of the NFT mint associated with this key."
            ],
            "type": "publicKey"
          },
          {
            "name": "keyIndex",
            "docs": [
              "Index of the key, used for uniquely identifying it within a collection or system."
            ],
            "type": "u64"
          },
          {
            "name": "exited",
            "docs": [
              "A flag to indicate whether this key has exited or been deactivated (0 = active, 1 = exited)."
            ],
            "type": "u8"
          },
          {
            "name": "bump",
            "docs": [
              "Bump seed for Program Derived Address (PDA) associated with this key."
            ],
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidKeyAccount",
      "msg": "Invalid account key"
    },
    {
      "code": 6001,
      "name": "RoundStarted",
      "msg": "Round already started"
    },
    {
      "code": 6002,
      "name": "RoundOver",
      "msg": "Round over"
    },
    {
      "code": 6003,
      "name": "RoundNotOver",
      "msg": "Round not over"
    },
    {
      "code": 6004,
      "name": "InvalidAsset",
      "msg": "Invalid Asset"
    },
    {
      "code": 6005,
      "name": "CalculationError",
      "msg": "An error occurred during calculation."
    },
    {
      "code": 6006,
      "name": "DivisionError",
      "msg": "An error occurred during division, likely division by zero."
    },
    {
      "code": 6007,
      "name": "InvalidOwner",
      "msg": "Doesn't matched with token owner"
    }
  ]
};
