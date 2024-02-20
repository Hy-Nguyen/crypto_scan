// Import axios
import axios from "axios";

export default async function getCitrus(
  wallet = ""
) {
  if (wallet === "") {
    wallet =
      "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1";
  }
  var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;
  var citrusHeader = {
    headers: {
      authority: "citrus.famousfoxes.com",
      referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    },
  };

  var citrusResponse = await axios.get(
    citrusUrl,
    citrusHeader
  );
  var citrusResponseJson =
    await citrusResponse.data;

  var currentLoaned =
    citrusResponseJson["loanSummary"][
      "currentLoaned"
    ];
  var pendingOffers =
    citrusResponseJson["loanSummary"][
      "pendingOffers"
    ];

  var citrusTotal = currentLoaned + pendingOffers;

  console.log({
    loaned: currentLoaned.toFixed(2),
    offers: pendingOffers.toFixed(2),
    total: citrusTotal.toFixed(2),
  });
  return {
    loaned: currentLoaned.toFixed(2),
    offers: pendingOffers.toFixed(2),
    total: citrusTotal.toFixed(2),
  };
}
