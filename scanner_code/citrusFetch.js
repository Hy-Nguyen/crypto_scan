export default function citrusHeader(wallet) {
  var citrusUrl = `https://citrus.famousfoxes.com/citrus/userSocials/${wallet}`;
  var citrusHeader = {
    authority: "citrus.famousfoxes.com",
    referer: `https://citrus.famousfoxes.com/profile/${wallet}`,
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  };
  return [citrusUrl, citrusHeader];
}
