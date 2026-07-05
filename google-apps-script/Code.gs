// יש להדביק את הקוד הזה בעורך ה-Apps Script המחובר לגיליון האקסל (ראו README.md).

const HEADERS = [
  "תאריך שליחה",
  "שם מלא",
  "מדינה ועיר מגורים",
  "סטטוס",
  "כמה זמן גר בחול",
  "שלב שיקול רילוקיישן",
  "עיסוק",
  "תרומת העיסוק לקהילה",
  "נושאים",
  "נושא אחר - פירוט",
  "ערך מרכזי למאזינים",
  "נושא חשוב במיוחד",
  "נושאים למניעה",
];

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }

  const data = JSON.parse(e.postData.contents);
  const row = HEADERS.map((header) => data[header] || "");
  sheet.appendRow(row);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" })
  ).setMimeType(ContentService.MimeType.JSON);
}
