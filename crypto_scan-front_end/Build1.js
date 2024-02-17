
   // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


   let i = 0 


   while (i<walletAddresses) {
     getHadeswapPool()
   }
   
   
       // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
       // Entire function to pull Data and Parse code
       // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   
   function getHadeswapPool(walletAddresses) {
       // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
       // Citrus Lending wallet: "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1"
       // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
   
       var walletAddress = "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1"
     
       var citrusHeader = {
         headers: {
           authority: "citrus.famousfoxes.com",
           referer:
             "https://citrus.famousfoxes.com/profile/" + walletAddress,
           "user-agent":
             "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
         },
         muteHttpExceptions: true,
       };
       var citrusUrl =
         "https://citrus.famousfoxes.com/citrus/userSocials/" + walletAddress;
       var citrusResponse = UrlFetchApp.fetch(citrusUrl, citrusHeader);
       var citrusres = JSON.parse(citrusResponse);
       console.log(citrusres);
       var citrusTotal =
         citrusres["loanSummary"]["currentLoaned"] +
         citrusres["loanSummary"]["pendingOffers"];
       Logger.log(citrusres["loanSummary"]["currentLoaned"]);
       Logger.log(citrusres["loanSummary"]["pendingOffers"]);
       Logger.log("Citrus Loans Total: " + citrusTotal);
       const url = "https://api.tensor.so/graphql";
     
       // The GraphQL query.
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
     
       // The variables for the GraphQL query.
       const variables = {
         owner: walletAddress,
       };
     
       // The headers for the request.
       const headers = {
         "Content-Type": "application/json",
         "X-TENSOR-API-KEY": "da2b8de2-2234-4d30-bf6e-0de556ed5858",
       };
     
       // Make the POST request.
       const response = UrlFetchApp.fetch(url, {
         method: "POST",
         headers: headers,
         payload: JSON.stringify({ query, variables }),
       });
       Utilities.sleep(2000); // Sleep for 500
     
       const data = JSON.parse(response.getContentText());
       var totalPoolNFTValue = 0; //Only Inside Pools
       var totalPoolFeeValue = 0; // Fees Inside Pools
       var totalPoolLiquidity = 0; // Liquidity Inside Pools
     
       for (const pool of data.data.userTswapOrders) {
         // Logger.log(pool)
         var poolNFTAmount =
           (pool.pool.nftsForSale.length * pool.floorPrice) / 1000000000;
         totalPoolNFTValue += poolNFTAmount;
     
         var poolFeeAmount = pool.pool.mmFeeBalance / 1000000000;
         totalPoolFeeValue += poolFeeAmount;
     
         var poolLiquidityAmount = pool.pool.solBalance / 1000000000;
         totalPoolLiquidity += poolLiquidityAmount;
       }
       Logger.log("Total NFT Pool Value: " + totalPoolNFTValue);
       Logger.log("Total NFT Fee Value: " + totalPoolFeeValue);
       Logger.log("Total NFT Liquidity Pool Value: " + totalPoolLiquidity);
     
       let graphql = JSON.stringify({
         query: `query UserActiveListingsV2(
     $wallets: [String!]!
     $sortBy: ActiveListingsSortBy!
     $cursor: ActiveListingsCursorInputV2
     $limit: Int
     $slug: String
     ) {
     userActiveListingsV2(
     wallets: $wallets
     cursor: $cursor
     limit: $limit
     sortBy: $sortBy
     slug: $slug
     ) {
     page {
       endCursor {
         str
       }
       hasMore
     }
     txs {
       tx {
         txId
         txAt
         source
         mintOnchainId
         grossAmount
       }
     }
     }
     }`,
         variables: {
           wallets: [walletAddress],
           sortBy: "PriceAsc",
           cursor: null,
           limit: 1000,
           slug: null,
         },
       });
     
       let params = {
         method: "POST",
         payload: graphql,
         headers: {
           "Content-Type": "application/json",
           "X-TENSOR-API-KEY": "da2b8de2-2234-4d30-bf6e-0de556ed5858",
         },
       };
       Utilities.sleep(2000); // Sleep for 500
     
       var responseListing = UrlFetchApp.fetch(url, params);
       var listingData = JSON.parse(responseListing);
       var activeListingAmount = 0;
       for (const listings of listingData.data.userActiveListingsV2.txs) {
         activeListingAmount += listings.tx.grossAmount / 1000000000;
       }
     
       let inventoryData = JSON.stringify({
         query: `query Txs($owner: String!) {
     inventoryBySlug(owner: $owner) {
     mints {
       name
       numMints
       collName
     }
     id
     slug
     statsV2 {
       sellNowPrice
       buyNowPrice
     }
     }
     }`,
         variables: {
           owner: walletAddress,
         },
       });
     
       let inventoryParams = {
         method: "POST",
         payload: inventoryData,
         headers: {
           "Content-Type": "application/json",
           "X-TENSOR-API-KEY": "da2b8de2-2234-4d30-bf6e-0de556ed5858",
         },
       };
     
       var inventoryRes = UrlFetchApp.fetch(url, inventoryParams);
       var inventoryJson = JSON.parse(inventoryRes);
         var totalHighestPriceTensorians = 0;
     
       function getTensorianPrices() {
         let tensorData = JSON.stringify({
           query: `query UserPortfolio($wallet: String!, $includeUnverified: Boolean, $includeCompressed: Boolean) {
     stakedTensorians(owner: $wallet) {
     ...ReducedMintWithColl
     __typename
     }
     userPortfolioCollections(
     wallets: [$wallet]
     includeUnverified: $includeUnverified
     includeCompressed: $includeCompressed
     ) {
     slug
     slugDisplay
     name
     statsV2 {
       buyNowPrice
       sellNowPrice
       numMints
       __typename
     }
     compressed
     __typename
     }
     }
     
     fragment ReducedMintWithColl on MintWithColl {
     ...ReducedMint
     collName
     slug
     slugDisplay
     numMints
     __typename
     }
     
     fragment ReducedMint on TLinkedTxMintTV2 {
     onchainId
     compressed
     owner
     name
     imageUri
     attributes {
     trait_type
     value
     __typename
     }
     lastSale {
     price
     txAt
     __typename
     }
     accState
     hidden
     ...MintRarityFields
     staked {
     stakedAt
     activatedAt
     stakedByOwner
     __typename
     }
     __typename
     }
     
     fragment MintRarityFields on TLinkedTxMintTV2 {
     rarityRankHrtt
     rarityRankStat
     rarityRankTeam
     rarityRankTn
     __typename
     }
     `,
           variables: {
             wallet: walletAddress,
             includeUnverified: true,
             includeCompressed: true,
           },
         });
     
         let inventoryParams = {
           method: "POST",
           payload: tensorData,
           headers: {
             "Content-Type": "application/json",
             "X-TENSOR-API-KEY": "da2b8de2-2234-4d30-bf6e-0de556ed5858",
           },
         };
         var tensorRes = UrlFetchApp.fetch(url, inventoryParams);
         var tensorArray = JSON.parse(tensorRes);
     
         Logger.log(tensorArray);
         Logger.log("List of tensorians");
     
         // Retrieve traits and their prices
         var traits = getTraitPrices();
         var stakedTensorians = tensorArray.data.stakedTensorians;
     
         for (var i = 0; i < stakedTensorians.length; i++) {
           var tensorian = stakedTensorians[i];
           console.log(tensorian.name);
           // Find the highest-priced trait for each Tensorian
           var highestPricedTrait = getHighestPricedTrait(
             tensorian.attributes,
             traits,
           );
           console.log(highestPricedTrait);
           // Add the price of the highest-priced trait to the total
           if (highestPricedTrait && highestPricedTrait.price) {
             totalHighestPriceTensorians += highestPricedTrait.price;
           }
         }
         // Log or process the total highest price
         Logger.log("Total Highest Price: " + totalHighestPriceTensorians);
       }
     
       function getHighestPricedTrait(nftAttributes, traits) {
         var pricedTraits = [];
     
         // Collect all matching traits and their prices
         nftAttributes.forEach(function (attribute) {
           var traitType = attribute["trait_type"];
           var value = attribute["value"];
     
           traits.forEach(function (trait) {
             if (
               trait["category"] === traitType &&
               trait["sub_category"] === value
             ) {
               pricedTraits.push(trait);
             }
           });
         });
     
         // Sort by price in descending order
         pricedTraits.sort(function (a, b) {
           return b.price - a.price;
         });
     
         // Determine if the highest price is an outlier
         if (
           pricedTraits.length > 1 &&
           isOutlier(pricedTraits[0].price, pricedTraits)
         ) {
           return pricedTraits[1]; // Return the second highest if the highest is an outlier
         }
     
         return pricedTraits[0];
       }
     
       function isOutlier(price, pricedTraits) {
         var threshold = 175; // Set your threshold here, e.g., 110
     
         // Check if price is considerably above the threshold
         return price > threshold;
       }
     
       function getTraitPrices() {
         var url = "https://graphql.tensor.trade/graphql";
     
         var payload = JSON.stringify([
           {
             operationName: "CollTraits",
             variables: {
               slug: "05c52d84-2e49-4ed9-a473-b43cab41e777",
             },
             query:
               "query CollTraits($slug: String!) {\n  traits(slug: $slug) {\n    ...ReducedCollectionTraitsRarities\n    __typename\n  }\n}\n\nfragment ReducedCollectionTraitsRarities on CollectionTraitsRarities {\n  traitMeta\n  traitActive\n  numMints\n  raritySystems\n  __typename\n}",
           },
         ]);
     
         var options = {
           method: "post",
           contentType: "application/json",
           payload: payload,
           muteHttpExceptions: true, // To handle errors more gracefully
         };
     
         var response = UrlFetchApp.fetch(url, options);
         var json = JSON.parse(response.getContentText());
     
         var traits = [];
     
         json.forEach(function (item) {
           var traitsActive = item.data.traits.traitActive;
     
           for (var category in traitsActive) {
             if (traitsActive.hasOwnProperty(category)) {
               var subCategories = traitsActive[category];
               for (var subCategory in subCategories) {
                 if (subCategories.hasOwnProperty(subCategory)) {
                   var details = subCategories[subCategory];
                   var price = details["p"];
                   traits.push({
                     category: category,
                     sub_category: subCategory,
                     price: price / 1000000000,
                   });
                 }
               }
             }
           }
         });
     
         return traits;
       }
     
       getTensorianPrices();
       var inventoryNotListed = [];
     
       for (const mint of inventoryJson.data.inventoryBySlug) {
         const collname = mint.mints[0].collName;
         const id = mint.id;
         const slug = mint.slug;
     
         const numMints = mint.mints.length;
         inventoryNotListed.push({
           num: numMints,
           name: collname,
           id: id,
           slug: slug,
           price: mint.statsV2.buyNowPrice,
         });
       }
       Logger.log("Active Listed Sol Amount: " + activeListingAmount);
     
       var totalNotListed = 0;
       for (const collection of inventoryNotListed) {
         var dataFP = collection.price / 1000000000; // set fp to the buy/sell now
         totalNotListed += dataFP * collection.num;
       }
     
       Logger.log("Total NFT FP Not listed: " + totalNotListed);
     
   
       
       //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
       // Wallet Balance (428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1)
       //  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
     
       var raw = JSON.stringify({
         jsonrpc: "2.0",
         id: 1,
         method: "getBalance",
         params: [walletAddress],
       });
       var requestOptions = {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         payload: raw,
         redirect: "follow",
       };
       Utilities.sleep(2000); // Sleep for 500
     
       var account =
         "https://rpc.helius.xyz/?api-key=df489ca2-8f44-41d6-89c6-c8f6bc5776a9";
       var reserveLiquid = UrlFetchApp.fetch(account, requestOptions);
       var reserveData = JSON.parse(reserveLiquid);
       var totalReserve = reserveData.result.value / 1000000000;
     
       Logger.log("Total Reserve: " + totalReserve);
       var totalSol =
         totalPoolLiquidity +
         totalPoolNFTValue +
         totalPoolFeeValue +
         totalReserve +
         activeListingAmount +
         citrusTotal +
         totalNotListed + totalHighestPriceTensorians;
       Logger.log("Total: " + totalSol);
     
       var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
       var getLastRow = sheet.getLastRow() + 1;
       var dateNow = new Date();
     
       var insertData = [
         [
           [
             Utilities.formatDate(
               dateNow,
               "America/Los_Angeles",
               "MM-dd-yyyy HH:mm:ss",
             ) + "",
           ],
           [totalPoolLiquidity + ""],
           [totalPoolNFTValue + totalHighestPriceTensorians + ""],
           [totalPoolFeeValue + ""],
           [totalReserve + ""],
           [totalNotListed + ""],
           [totalSol + ""],
           [totalSol - totalPoolFeeValue + ""],
           [citrusTotal + ""],
         ],
       ];
       Logger.log(insertData);
       var insertDate = "Sheet1!B" + getLastRow + ":J" + getLastRow;
       sheet.getRange(insertDate).setValues(insertData);
     }
   
     
   