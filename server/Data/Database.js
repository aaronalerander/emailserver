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
  // { id: 28323904, emailId: 1, version: 2, opens: 1, clicks: 1 },
  // { id: 1103, emailId: 2, version: 1, opens: 1, clicks: 1 },
  // { id: 1104, emailId: 3, version: 1, opens: 1, clicks: 1 },
];

let Emails = [
  {
    id: 1,
    name: "Welcome Email",
    opens: 0,
    clicks: 0,
    currentTemplateId: 28334190,
  },
  // {
  //   id: 2,
  //   name: "Reset Passowrd",
  //   opens: 1,
  //   clicks: 1,
  //   currentTemplateId: 1103,
  // },
  // {
  //   id: 3,
  //   name: "Purchase Confirmation",
  //   opens: 1,
  //   clicks: 1,
  //   currentTemplateId: 1104,
  // },
];

module.exports = { Recipients, Templates, Emails };
