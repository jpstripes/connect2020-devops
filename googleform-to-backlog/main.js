/**
 * This function retrieves Google Form event and create Backlog Issue.
 * Note this script should be triggered on Google Spreadsheet, not Google Forms.
 */
function send(ev) {
  if (!ev.namedValues) {
    return;
  }

  const props = PropertiesService.getScriptProperties();

  const task = {
    projectId: props.getProperty("backlogProjectId"),
    parentIssueId: props.getProperty("backlogParentIssueId"),
    "categoryId[]": props.getProperty("backlogCategoryId"),
    priorityId: props.getProperty("backlogPriorityId"),
    issueTypeId: props.getProperty("backlogIssueTypeId"),
    summary: "スポンサー登録 ",
    description: description(ev.namedValues)
  };

  // Enable this line on debugging.
  /*
  UrlFetchApp.fetch("https://58ccc36c.ngrok.io", {
    method: "post",
    payload: JSON.stringify({
      hello: "spreadsheet",
      event: ev,
      task: task
    })
  });
  */

  UrlFetchApp.fetch(issuesEndpoint(), {
    method: "post",
    payload: task
  });
}

/**
 * Returns issue summary (title) for Backlog.
 * Note this function checks a property containing the company name,
 * then fallback to plain string without company name.
 * It's a fragile implementation since it breaks when Google Forms attribute changes.
 */
function summary(obj) {
  // This is the fragile part, make sure the key is identical to Google Forms.
  const name = obj["貴社名/団体名"];

  const title = "サポーター登録";

  if (name) {
    return [title, name].join(" ");
  }

  return title;
}

/**
 * Returns Backlog Issues endpoint plus API token.
 */
function issuesEndpoint() {
  const url = "https://jpstripes.backlog.com/api/v2/issues?apiKey=";
  const props = PropertiesService.getScriptProperties();

  return url + props.getProperty("backlogApiToken");
}

/**
 * Returns description string with additional header and footer.
 *
 * @param obj - ev.namedValues of Google Forms.
 */
function description(obj) {
  var outs = [
    "Google Formsからスポンサーの申し込みがありました。",
    "\n\n",
    "## 申込内容",
    "\n"
  ];

  // Simply concatenating all given inputs as body message.
  Object.keys(obj).forEach(function(key) {
    const val = obj[key];

    outs.push("[" + key + "]", "\n", val.join(", "), "\n\n");
  });

  const todos = [
    "## TODOs",
    "",
    "- [ ] 審査",
    "- [ ] 担当者を決める",
    "- [ ] 請求書を送る",
    "- [ ] 入金を確認する",
    "- [ ] Webサイトに掲載する",
    "- [ ] 掲載したことを報告する"
  ].join("\n");

  return [outs.join(""), todos].join("\n");
}
