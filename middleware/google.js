const fs = require("fs").promises;
const path = require("path");
const process = require("process");
const {
  authenticate,
} = require("@google-cloud/local-auth");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(
  process.cwd(),
  "middleware/token.json"
);
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "middleware/credentials.json"
);

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fs.readFile(TOKEN_PATH);
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials);
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await fs.readFile(
    CREDENTIALS_PATH
  );
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token:
      client.credentials.refresh_token,
  });
  await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client =
    await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function listData(auth) {
  const sheets = google.sheets({
    version: "v4",
    auth,
  });
  const res =
    await sheets.spreadsheets.values.get({
      spreadsheetId:
        "1xvMcTKxRXHEkmllPs8bty0DfYzQ4LDUby4CWOL5LOrE",
      range: "Sheet1!B5:I",
    });
  const rows = res.data.values;

  const dateMap = new Map();

  if (!rows || rows.length === 0) {
    console.log("No data found.");
    return;
  }

  rows.forEach((row) => {
    const date = new Date(row[0]); // Convert cell to a Date object
    row[0] = date;

    let dateString =
      "" +
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1) +
      "-" +
      date.getDate(); // Get the date part as a string

    if (dateMap.has(dateString)) {
      let storedRow = dateMap.get(dateString).row; // Get the row already stored
      let storedDate = new Date(storedRow[0]); // Convert its date cell to a Date object

      if (date > storedDate) {
        // If the current row's time is later than that of the stored row...
        dateMap.set(dateString, {
          row,
        }); // Replace the stored row with the current row
      }
    } else {
      dateMap.set(dateString, {
        row,
      }); // If there is no entry for the date yet, add the current row
    }
  });

  rows.sort((a, b) => b[0] - a[0]);

  return rows;

  // console.log(mostRecentRows);

  // rows.forEach((row) => {
  //   // Print columns A and E, which correspond to indices 0 and 4.
  //   console.log(`${row[0]}, ${row[7]}`);
  // });
}

export default async function getListings() {
  const rows = await authorize()
    .then(listData)
    .catch(console.error);

  return rows;
}
