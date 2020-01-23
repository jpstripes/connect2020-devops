# Backlog Ops Script

This simple script retrieves Google Forms submission data from Google Spreadsheet trigger, then create new Backlog Issue.

## Setup

### What you need

1. Google Forms
2. Google Spreadsheet
3. Google Apps Script
4. Google Apps Script trigger, configure in Google Spreadsheet

### Google Apps Script

You'll need to set the following properties to [Google Apps Script properties](https://qiita.com/unsoluble_sugar/items/ec5c935c4bfc2e06b246).
All properties are mandatory.

- `backlogProjectId`: [Project ID](https://yatta47.hateblo.jp/entry/2017/07/08/130000)
- `backlogPriorityId`: [Priority ID](https://developer.nulab.com/ja/docs/backlog/api/2/get-priority-list/)
- `backlogCategoryId`: [Category ID](https://developer.nulab.com/ja/docs/backlog/api/2/get-category-list/)
- `backlogParentIssueId`: [Parent Issue ID](https://developer.nulab.com/docs/backlog/api/2/get-issue-list/)
- `backlogIssueTypeId`: [Issue Type ID](https://developer.nulab.com/ja/docs/backlog/api/2/get-issue-type-list/)
- `backlogApiToken`: [Your Personal Backlog API Token](https://developer.nulab.com/ja/docs/backlog/auth/)

## Build

You don't need to build anything, it's just a single JavaScript file.
Copy and paste into your Google Apps Script editor.

## Debug

Run local HTTP server

    cd debugger
    make run

Then, use ngrok to bind to port 10000

    ngrok http 10000

Modify (uncomment) the debug section on [main.js](main.js)

    UrlFetchApp.fetch("https://58ccc36c.ngrok.io"... --> Change this URL

Paste the updated code to Google Apps Script editor, then try to submit new post from Google Forms.
You'll see ngrok result on your local machine if everything goes well.
