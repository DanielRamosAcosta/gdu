type GoogleDomainsResponseMap = {
  key: string;
  success: boolean;
  description: string;
};

const maps: GoogleDomainsResponseMap[] = [
  {
    key: "good",
    success: true,
    description:
      "The update was successful. You should not attempt another update until your IP address changes.",
  },
  {
    key: "nochg",
    success: true,
    description:
      "The supplied IP address is already set for this host. You should not attempt another update until your IP address changes.",
  },
  {
    key: "nohost",
    success: false,
    description:
      "The hostname doesn't exist, or doesn't have Dynamic DNS enabled.",
  },
  {
    key: "badauth",
    success: false,
    description:
      "The username/password combination isn't valid for the specified host.",
  },
  {
    key: "notfqdn",
    success: false,
    description:
      "The supplied hostname isn't a valid fully-qualified domain name.",
  },
  {
    key: "badagent",
    success: false,
    description:
      "Your Dynamic DNS client makes bad requests. Ensure the user agent is set in the request.",
  },
  {
    key: "abuse",
    success: false,
    description:
      "Dynamic DNS access for the hostname has been blocked due to failure to interpret previous responses correctly.",
  },
  {
    key: "911",
    success: false,
    description: "An error happened on our end. Wait 5 minutes and retry.",
  },
  {
    key: "conflict",
    success: false,
    description:
      "A custom A or AAAA resource record conflicts with the update. Delete the indicated resource record within the DNS settings page and try the update again.",
  },
  {
    key: "conflict",
    success: false,
    description:
      "A custom A or AAAA resource record conflicts with the update. Delete the indicated resource record within the DNS settings page and try the update again.",
  },
];

export function parseResponse(responseText: string) {
  const map = maps.find((map) => responseText.match(map.key));

  if (!map) {
    return responseText;
  }

  return map.description;
}
