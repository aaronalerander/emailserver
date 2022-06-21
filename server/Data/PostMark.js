let postmark = require("postmark");

const serverToken = "e23f58d6-bd8a-4bf1-a1f9-a7ac1174dd2b"; //hid in env variable
let postmarkClient = new postmark.ServerClient(serverToken); // got to move these over

module.exports = { postmarkClient };
