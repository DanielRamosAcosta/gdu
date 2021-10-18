export async function safeGetEnvVariable(
  variable: string,
): Promise<string | undefined> {
  const status = await Deno.permissions.query({
    name: "env",
    variable,
  });

  if (status.state === "granted") {
    return Deno.env.get(variable);
  }

  return undefined;
}
