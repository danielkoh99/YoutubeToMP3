const localTunnel = require("localtunnel");
const cron = require("node-cron");
const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};
// cron.schedule("* * * * *", () => {
//   console.log("running a task every minute");
// });
(async () => {
  const tunnel = await localTunnel({ port: 19000, subdomain: "converter" });

  console.log("Tunnel URL: " + tunnel.url);

  tunnel.on("close", () => {
    console.log("Tunnel closed URL: " + tunnel.url);
  });

  console.log("Press any key to exit");
  await keypress();

  tunnel.close();
})().then(process.exit);
