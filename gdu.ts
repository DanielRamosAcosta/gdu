import { Command } from "https://x.nest.land/cliffy@0.19.6/command/mod.ts";
import { parseResponse } from "./src/errors-map.ts";
import { safeGetEnvVariable } from "./src/parse-response.ts";

const defaultUsername = await safeGetEnvVariable("GOOGLE_DOMAINS_USERNAME");
const defaultPassowrd = await safeGetEnvVariable("GOOGLE_DOMAINS_PASSWORD");
const defaultHostname = await safeGetEnvVariable("GOOGLE_DOMAINS_HOSTNAME");

type Options = {
  username: string;
  password: string;
  hostname: string;
};

const {
  options: { hostname, username, password },
} = await new Command<Options>()
  .name("gdu")
  .version("0.1.0")
  .description("Google Domains updater")
  .allowEmpty(false)
  .option("-h, --hostname [hostname]", "the hostname you want to udpdate", {
    default: defaultHostname,
    required: true,
  })
  .option("-u, --username [username]", "the username of your account", {
    default: defaultUsername,
    required: true,
  })
  .option("-p, --password [password]", "the password of your account", {
    default: defaultPassowrd,
    required: true,
  })
  .parse(Deno.args);

console.log(`Updating ${hostname}`);

const url = "https://domains.google.com/nic/update";
const searchParams = new URLSearchParams({
  hostname,
});

const response = await fetch(url + "?" + searchParams, {
  headers: {
    Authorization: `Basic ${btoa(`${username}:${password}`)}`,
  },
});

const responseText = await response.text();
const description = parseResponse(responseText);

console.log(responseText);
console.log(description);
