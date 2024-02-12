function getCitrus(address = "") {
  var wallet =
    "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  // Citrus
  var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;
  var citrusHeader = {
    headers: {
      authority: "citrus.famousfoxes.com",
      referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    },
    muteHttpExceptions: true,
  };

  var citrusResponse = UrlFetchApp.fetch(
    citrusUrl,
    citrusHeader
  );

  var citrusres = JSON.parse(citrusResponse);
  var currentLoaned =
    citrusres["loanSummary"]["currentLoaned"];
  var pendingOffers =
    citrusres["loanSummary"]["pendingOffers"];

  var citrusTotal = currentLoaned + pendingOffers;

  // Console Log Tests for Citrus:
  console.log(citrusres);
  Logger.log(
    "Citrus Loans Total: " + citrusTotal
  );
}
