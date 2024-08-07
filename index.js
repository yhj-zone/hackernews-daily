const getHeadlines = require("./utils/getHeadlines");
const issue = require("./utils/issue");

// run every day at 00:01 UTC
const run = async (date) => {
  const contents = await getHeadlines(date);
  console.log(contents);
  const res = await issue.open({
    owner: "yhj-zone",
    repo: "hackernews-daily",
    title: `Hacker News Daily Point Above 100 @${new Date(date)
      .toISOString()
      .slice(0, 10)}`,
    body: contents,
  });

  const issueNumber = res.data.number;

  await issue.lock({
    owner: "yhj-zone",
    repo: "hackernews-daily",
    issueNumber,
  });
};

run(new Date()).catch((err) => {
  throw err;
});
// Activate action