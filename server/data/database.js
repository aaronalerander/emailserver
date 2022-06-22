let Recipients = [
  {
    id: 1,
    email: "aaron@scaledrones.com",
    first: "Aaron",
    last: "Alexander",
  },
];

let Templates = [
  { id: 28341325, emailId: 1, version: 1, opens: 0, clicks: 0 },
  { id: 28340119, emailId: 1, version: 2, opens: 0, clicks: 0 },
  { id: 28339915, emailId: 2, version: 1, opens: 0, clicks: 0 },
  { id: 28339955, emailId: 2, version: 2, opens: 0, clicks: 0 },
  { id: 28340130, emailId: 3, version: 1, opens: 0, clicks: 0 },
  { id: 28340074, emailId: 3, version: 2, opens: 0, clicks: 0 },
];

let Emails = [
  {
    id: 1,
    name: "Welcome Email",
    opens: 0,
    clicks: 0,
    currentTemplateId: 28340119,
  },
  {
    id: 2,
    name: "Reset Password",
    opens: 0,
    clicks: 0,
    currentTemplateId: 28339955,
  },
  {
    id: 3,
    name: "Refund",
    opens: 0,
    clicks: 0,
    currentTemplateId: 28340074,
  },
];

module.exports = { Recipients, Templates, Emails };
