import fetch from "node-fetch";

export default async function getTensor(
  wallet = ""
) {
  if (wallet == "") {
    wallet =
      "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  }

  var api_key =
    "da2b8de2-2234-4d30-bf6e-0de556ed5858";

  const variables = { owner: wallet };

  // query string removed for brevity...
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

  const headers = {
    "Content-Type": "application/json",
    "X-TENSOR-API-KEY": api_key,
  };

  const url = "https://api.tensor.so/graphql";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}`
      );
    } else {
      const data = await response.json();

      var totalPoolNFTValue = 0;
      var totalPoolFeeValue = 0;
      var totalPoolLiquidity = 0;

      const div = 1000000000;
      for (const pool of data.data
        .userTswapOrders) {
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

      // console.log(
      //   `Total NFT Pool Value: ${totalPoolNFTValue}`
      // );
      // console.log(
      //   `Total NFT Fee Value: ${totalPoolFeeValue}`
      // );
      // console.log(
      //   `Total NFT Liquidity Pool Value: ${totalPoolLiquidity}`
      // );


      // Object for tensor values
      const res = {
        NFTValue: totalPoolNFTValue.toFixed(2),
        FeeValue: totalPoolFeeValue.toFixed(2),
        PoolLiquidity:
          totalPoolLiquidity.toFixed(2),
      };

      
      console.log(res);
      return res;
      

    // Convert tensor data into JSON string 
    const tensorData = JSON.stringify(res);

    // Print out tensor data JSON string
    console.log(tensorData)




    } // end of else block

  } catch (error) {
    console.error(
      "There was a problem with your fetch operation: ",
      error
    );
  } // end of catch block

} // end of getTensor function
