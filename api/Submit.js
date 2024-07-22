// api/submit.js

const { google } = require('googleapis');

const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // Google Sheets ID
const SHEET_NAME = process.env.phishingchallenge || 'phishingchallenge'; // Name of the sheet to write

const getAuth = () => {
  return new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
};

const appendToSheet = async (auth, data) => {
  const sheets = google.sheets({ version: 'v4', auth });
  const request = {
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A1`, // Adjust the range as per your needs
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [data],
    },
  };

  try {
    const response = await sheets.spreadsheets.values.append(request);
    console.log('Data appended successfully:', response.data);
  } catch (err) {
    console.error('Error appending data:', err);
    throw err;
  }
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const auth = getAuth();

  try {
    await appendToSheet(auth, req.body.responses);
    res.status(200).send('Responses saved to Google Sheets');
  } catch (error) {
    res.status(500).send('Error saving responses: ' + error.message);
  }
};
