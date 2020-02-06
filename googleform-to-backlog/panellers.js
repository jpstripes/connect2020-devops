/**
 * This function retrieves Google Form event and create Backlog Issue.
 * Note this script should be triggered on Google Spreadsheet, not Google Forms.
 */
function send(ev) {
  if (!ev.namedValues) {
    return;
  }

  UrlFetchApp.fetch(issuesEndpoint(), {
    method: "post",
    payload: buildIssue(ev.namedValues),
  });
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
 * Build Backlog Issue for paneller profile registration.
 */
function buildIssue(obj) {
  const props = PropertiesService.getScriptProperties();

  var desc = [
    "パネルディスカッションの登壇者（パネラー）のプロフィールを掲載お願いします。",
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
    "- [ ] Webサイトのパネルセッションを作成/更新する --> [Shifter](https://go.getshifter.io/admin/teams/181a370f-387e-4615-a1cf-2465145805b6/sites/19430699-e151-4653-af7f-9b58b7d63d95)",
    "- [ ] Webサイトのタイムテーブルを更新する --> [Shifter](https://go.getshifter.io/admin/teams/181a370f-387e-4615-a1cf-2465145805b6/sites/19430699-e151-4653-af7f-9b58b7d63d95)",
    "- [ ] Webサイトを公開する",
  ].join("\n");

  return {
    projectId: props.getProperty("backlogProjectId"),
    parentIssueId: props.getProperty("backlogParentIssueId"),
    "categoryId[]": props.getProperty("backlogCategoryId"),
    priorityId: props.getProperty("backlogPriorityId"),
    issueTypeId: props.getProperty("backlogIssueTypeId"),
    assigneeId: props.getProperty("backlogAssigneeId"),
    summary: obj["登壇枠"] + ": パネラーのプロフィールを各媒体に掲載 - " + obj["所属企業・団体"] + " " + obj["登壇者氏名"] + "さん",
    description: [desc.join(""), todos].join("\n"),
  };
}
