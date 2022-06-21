let Recipients = [
  {
    id: 1,
    email: "aaron@scaledrones.com",
    first: "Aaron",
    last: "Alexander",
  },
  { id: 2, email: "aaron@scaledrones.com", first: "Joe", last: "Bob" },
];

let Templates = [
  { id: 28322777, emailId: 1, version: 1, opens: 1, clicks: 1 },
  { id: 28323904, emailId: 1, version: 2, opens: 1, clicks: 1 },
  { id: 1103, emailId: 2, version: 1, opens: 1, clicks: 1 },
  { id: 1104, emailId: 3, version: 1, opens: 1, clicks: 1 },
];

let Emails = [
  { id: 1, name: "Welcome", opens: 2, clicks: 2, currentTemplateId: 28322777 },
  {
    id: 2,
    name: "Reset Passowrd",
    opens: 1,
    clicks: 1,
    currentTemplateId: 1103,
  },
  {
    id: 3,
    name: "Purchase Confirmation",
    opens: 1,
    clicks: 1,
    currentTemplateId: 1104,
  },
];

module.exports = { Recipients, Templates, Emails };
