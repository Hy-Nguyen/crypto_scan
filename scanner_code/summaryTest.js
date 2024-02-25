// Import axios
// import axios from "axios";

const axios = require("axios");

const wallets = [
  "D3kf1Lo9a6GdzLStHoxokXHPTBfcAf19Vvn6pycEKEsf",
  "G7AWxhckzMNgnPpWY8uYJULFZAwM8dmGWXWmK1FY5e12",
  "7Qud71boqj86Pi8TBkSTzY2h3VPASGpqCTb5gWoG9fLM",
  "428JqXgFg3yjuMoa4ZkKi7MBJLn2thvpSTH6HS2NLQC1",
];

getCitrusSummary(wallets);

// passes in array
async function getCitrusSummary(wallet) {
  // var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;

  const urls = wallets.map(
    (wallet) =>
      `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`
  );
  const headers = wallets.map((wallet) => ({
    headers: {
      authority: "citrus.famousfoxes.com",
      referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
    },
  }));

  try {
    const data = await Promise.all(
      urls.map((url, index) => {
        return axios
          .get(url, headers[index])
          .then((response) => response.data);
      })
    );

    const totalCurrentLoaned = data.reduce(
      (total, item) => {
        return (
          total + item.loanSummary.currentLoaned
        );
      },
      0
    );

    const totalPendingOffers = data.reduce(
      (total, item) => {
        return (
          total + item.loanSummary.pendingOffers
        );
      },
      0
    );

    var res = {
      totalCurrentLoaned: totalCurrentLoaned,
      totalPendingOffers: totalPendingOffers,
      total:
        totalCurrentLoaned + totalPendingOffers,
    };

    console.log(res);

    return res;
  } catch (error) {
    console.log("Error: " + error);
  }
}
