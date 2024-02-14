function getTensor(wallet = "", api_key = "") {
  wallet =
    "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  api_key =
    "da2b8de2-2234-4d30-bf6e-0de556ed5858";
  // Tensor Var's

  
  
  const variables = {
    owner: wallet,
  };

  
  const query = `query UserSwapOrders($owner: String!) {
        userTswapOrders(owner: $owner) {
          pool {
          ...ReducedTSwapPool
          __typename
          }
          slug
          collName
          floorPrice
          numMints
          __typename
        }
        userHswapOrders(owner: $owner) {
          pool {
          ...ReducedHSwapPool
          __typename
          }
          slug
          collName
          floorPrice
          numMints
          __typename
        }
        }
    
        fragment ReducedTSwapPool on TSwapPool {
        address
        ownerAddress
        whitelistAddress
        poolType
        curveType
        startingPrice
        delta
        mmFeeBps
        mmFeeBalance
        takerSellCount
        takerBuyCount
        nftsHeld
        solBalance
        createdUnix
        statsTakerSellCount
        statsTakerBuyCount
        statsAccumulatedMmProfit
        margin
        lastTransactedAt
        maxTakerSellCount
        nftsForSale {
          ...ReducedMint
          __typename
        }
        __typename
        }
    
        fragment ReducedMint on TLinkedTxMintTV2 {
        onchainId
        name
        imageUri
        metadataUri
        metadataFetchedAt
        sellRoyaltyFeeBPS
        attributes {
          trait_type
          value
        }
        rarityRankTT
        rarityRankTTStat
        rarityRankHR
        rarityRankTeam
        rarityRankStat
        rarityRankTN
        lastSale {
          price
          priceUnit
          txAt
          __typename
        }
        accState
        __typename
        }
    
        fragment ReducedHSwapPool on HSwapPool {
        address
        pairType
        delta
        curveType
        baseSpotPrice
        feeBps
        mathCounter
        assetReceiver
        boxes {
          address
          vaultTokenAccount
          mint {
          ...ReducedMint
          __typename
          }
          __typename
        }
        feeBalance
        buyOrdersQuantity
        fundsSolOrTokenBalance
        createdAt
        lastTransactedAt
        __typename
        }`;

  // Req header
  const headers = {
    "Content-Type": "application/json",
    "X-TENSOR-API-KEY": api_key,
  };
  const url = "https://api.tensor.so/graphql";

  // POST req
  const response = UrlFetchApp.fetch(url, {
    method: "POST",
    headers: headers,
    payload: JSON.stringify({ query, variables }),
  });

  Utilities.sleep(2000); // Sleep for 500

  //   Response Handling
  const data = JSON.parse(
    response.getContentText()
  );

  var totalPoolNFTValue = 0; //Only Inside Pools
  var totalPoolFeeValue = 0; // Fees Inside Pools
  var totalPoolLiquidity = 0; // Liquidity Inside Pools

  //   Goes through the response and calculates asset values
  const div = 1000000000;
  for (const pool of data.data.userTswapOrders) {
    // Logger.log(pool)
    var poolNFTAmount =
      (pool.pool.nftsForSale.length *
        pool.floorPrice) /
      div;
    totalPoolNFTValue += poolNFTAmount;

    var poolFeeAmount =
      pool.pool.mmFeeBalance / div;
    totalPoolFeeValue += poolFeeAmount;

    var poolLiquidityAmount =
      pool.pool.solBalance / div;
    totalPoolLiquidity += poolLiquidityAmount;
  }
  Logger.log(
    `Total NFT Pool Value: ${totalPoolNFTValue}`
  );
  Logger.log(
    `Total NFT Fee Value: ${totalPoolFeeValue}`
  );
  Logger.log(
    `Total NFT Liquidity Pool Value: ${totalPoolLiquidity}`
  );


  // Array for NFT values and Wallets
  const tensorUserData = []

  // Intialize 
  const tensorData = {
    walletAddress: wallet,
    nftPoolValue: totalPoolNFTValue,
    nftFeeValue: totalPoolFeeValue,
    nftLiquidityPoolValue: totalPoolLiquidity 
  };

  // Check if there is a existing Json File
  try {
    const data = fs.readFileSync('tensor.json', 'utf8');
    tensorUserData = JSON.parse(data);
  } catch (err) {

  }

  // Push tensor data to tensor user array
  tensorUserData.push(tensorData)

  // Convert UserData to JSON
  const jsonData = JSON.stringfy(tensorUserData,null,2)


  // Write JSON Data to Json File
  fs.writeFile('tensor.json', jsonData, 'utf8', (err) => {
    if (err) {
      console.error("There was an error writing to the file: ", err);
      return;
    }

  });


}
