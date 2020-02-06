/**
 * This function retrieves Google Form event and create Backlog Issue.
 * Note this script should be triggered on Google Spreadsheet, not Google Forms.
 */
function send(ev) {
  if (!ev.namedValues) {
    return;
  }

  // First, create website publishing issue and retrieve the issue id.
  var publish = UrlFetchApp.fetch(issuesEndpoint(), {
    method: "post",
    payload: buildWebsiteIssue(ev.namedValues),
  });

  Logger.log(publish);
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
 * Build Backlog Issue for website publishing.
 */
function buildWebsiteIssue(obj) {
  const props = PropertiesService.getScriptProperties();

  var desc = [
    "登壇内容を各媒体に掲載お願いします。",
    "\n\n",
    "## 入力内容",
    "\n"
  ];

  // Simply concatenating all given inputs as body message.
  Object.keys(obj).forEach(function(key) {
    const val = obj[key];

    desc.push("[" + key + "]", "\n", val.join(", "), "\n\n");
  });

  const todos = [
    "## Website TODOs",
    "",
    "- [ ] OG画像を作成する --> [Figma](https://www.figma.com/file/gYUjek21b7iucdQtIROyrQ)",
    "- [ ] Webサイトにセッションを掲載する --> [Shifter](https://go.getshifter.io/admin/teams/181a370f-387e-4615-a1cf-2465145805b6/sites/19430699-e151-4653-af7f-9b58b7d63d95)",
    "- [ ] Webサイトのタイムテーブルを更新する --> [Shifter](https://go.getshifter.io/admin/teams/181a370f-387e-4615-a1cf-2465145805b6/sites/19430699-e151-4653-af7f-9b58b7d63d95)",
    "- [ ] Webサイトを公開する",
    "",
    "## SNS TODOs",
    "",
    "- [ ] BufferでTwitterへの投稿を予約する",
    "- [ ] BufferでFacebookへの投稿を予約する",
  ].join("\n");

  return {
    projectId: props.getProperty("backlogProjectId"),
    parentIssueId: props.getProperty("backlogParentIssueId"),
    "categoryId[]": props.getProperty("backlogCategoryId"),
    priorityId: props.getProperty("backlogPriorityId"),
    issueTypeId: props.getProperty("backlogIssueTypeId"),
    assigneeId: props.getProperty("backlogAssigneeId"),
    summary: "セッションを各媒体に掲載 - " + obj["所属企業・団体"] + " " + obj["登壇者氏名"] + "さん",
    description: [desc.join(""), todos].join("\n"),
  };
}
