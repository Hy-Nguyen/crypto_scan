const fetch = require("node-fetch");

async function getCitrus(address = "") {
  if (wallet == "") {
    var wallet =
      "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  }

  // Citrus
  var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;
  var citrusHeader = {
    headers: {
      authority: "citrus.famousfoxes.com",
      referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    },
  };

  try {
    var citrusResponse = await fetch(
      citrusUrl,
      citrusHeader
    );

    if (!citrusResponse.ok) {
      throw new Error(
        `HTTP error! status: ${citrusResponse.status}`
      );
    } else {
      var citrusres = await citrusResponse.json();
      var currentLoaned =
        citrusres["loanSummary"]["currentLoaned"];
      var pendingOffers =
        citrusres["loanSummary"]["pendingOffers"];
      var citrusTotal =
        currentLoaned + pendingOffers;

  // Console Log Tests for Citrus:
  console.log(citrusres);
  Logger.log(
    "Citrus Loans Total: " + citrusTotal);


  // Convert values into JSON 
  const citrusJson = JSON.stringy(citrusTotal);
  
  // Parse citrusTotal to a JSON file
  fs.writeFile('citrus.json', citrusJson, 'utf8', (err) => {
    if (err) {
      console.error("There was an error writing to the file: ", err);
      console.log("Hi"
      )
      return;
    }
  
  });
  
};
