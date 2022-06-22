let Recipients = [
  {
    id: 1,
    email: "aaron@scaledrones.com",
    first: "Aaron",
    last: "Alexander",
  },
];

let Templates = [
  { id: 28334190, emailId: 1, version: 1, opens: 0, clicks: 0 },
  { id: 28333948, emailId: 1, version: 2, opens: 0, clicks: 0 },
];

let Emails = [
  {
    id: 1,
    name: "Welcome Email",
    opens: 0,
    clicks: 0,
    currentTemplateId: 28334190,
  },
];

module.exports = { Recipients, Templates, Emails };
