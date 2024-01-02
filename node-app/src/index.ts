import express, { Express, Request, Response } from "express";
import path from "path";

const app: Express = express();
const port = process.env.PORT || 3000;

const AADB2C_HOSTNAME: string = process.env.AADB2C_HOSTNAME ?? "";
const AADB2C_TENANT: string = process.env.AADB2C_TENANT ?? "";
const AADB2C_APPLICATION_CLIENT_ID: string = process.env.AADB2C_APPLICATION_CLIENT_ID ?? "";
const AADB2C_APPLICATION_CLIENT_SECRET: string = process.env.AADB2C_APPLICATION_CLIENT_SECRET ?? "";
const AADB2C_USERFLOW_POLICY: string = process.env.AADB2C_USERFLOW_POLICY ?? "";

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/test", (req: Request, res: Response) => {
  res.send("Request arrived to web server!🎄");
});

app.get("/callback", (req: Request, res: Response) => {
  const authorizationCode: string | undefined = req.query['code']?.toString();
  if(authorizationCode != null) {
    const tokenEndpoint = buildTokenEndpoint(authorizationCode);
    res.setHeader("Host", AADB2C_HOSTNAME);
    res.setHeader("Content-Type", "application/x-www-form-urlencoded");
    res.redirect(tokenEndpoint);
  } else {
    res.send("authorization code is invalid.");
  }
});

/**
 * build token endpoint
 * refs -> https://learn.microsoft.com/ja-jp/azure/active-directory-b2c/openid-connect#get-a-token
 */
function buildTokenEndpoint(authorizationCode: string) {
  return path.join(("https://" + AADB2C_HOSTNAME), AADB2C_TENANT, AADB2C_USERFLOW_POLICY, "oauth2", "v2.0", "token") +
  "?grant_type=authorization_code" +
  `&code=${authorizationCode}` +
  `&client_id=${AADB2C_APPLICATION_CLIENT_ID}` +
  `&client_secret=${AADB2C_APPLICATION_CLIENT_SECRET}`;
}
