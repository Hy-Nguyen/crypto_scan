import creds from "../cred.json";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function GET(req) {
  const doc = new GoogleSpreadsheet(
    "1xvMcTKxRXHEkmllPs8bty0DfYzQ4LDUby4CWOL5LOrE"
  ); //Replace with your Google Sheet ID

  await doc.auth({
    client_email: creds.client_email,
    private_key: creds.private_key,
  });
  doc.auth
  await doc.loadInfo(); // loads document properties and worksheets
  const sheet = doc.sheetsById[0]; // or use doc.sheetsByIndex[index]
  const rows = await sheet.getRows(); // can pass in { limit, offset }

  // send the data
  res.status(200).json({ data: rows });
}
