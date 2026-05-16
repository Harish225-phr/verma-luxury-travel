import { renderErrorPage } from "../../src/lib/error-page";

// Netlify Functions handler types
type NetlifyEvent = {
  httpMethod?: string;
  rawPath?: string;
  rawUrl?: string;
  headers: Record<string, string>;
  body?: string;
};

type NetlifyContext = {
  functionVersion?: string;
  invocationId?: string;
  clientContext?: unknown;
};

type NetlifyResponse = {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
  isBase64Encoded: boolean;
};

type ServerEntry = {
  fetch: (request: Request) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) =>
        ((m as { default?: ServerEntry }).default ??
          (m as unknown as ServerEntry)),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isCatastrophicSsrErrorBody(
  body: string,
  responseStatus: number,
): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(
  response: Response,
): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(`SSR Error: ${body}`);
  return brandedErrorResponse();
}

const handler = async (
  event: NetlifyEvent,
  context: NetlifyContext,
): Promise<NetlifyResponse> => {
  try {
    // Convert Netlify event to a Web Request object
    const url =
      event.rawUrl ||
      `${event.headers.host || "localhost"}${event.rawPath || "/"}`;
    const request = new Request(url, {
      method: event.httpMethod || "GET",
      headers: event.headers as HeadersInit,
      body:
        event.httpMethod !== "GET" && event.httpMethod !== "HEAD"
          ? event.body
          : undefined,
    });

    // Get and execute the server entry
    const serverEntry = await getServerEntry();
    const response = await serverEntry.fetch(request);
    const normalizedResponse = await normalizeCatastrophicSsrResponse(response);

    // Convert Response to Netlify function response format
    const buffer = await normalizedResponse.arrayBuffer();
    return {
      statusCode: normalizedResponse.status,
      headers: Object.fromEntries(normalizedResponse.headers.entries()),
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (error) {
    console.error("SSR Function Error:", error);
    const errorResponse = brandedErrorResponse();
    const buffer = await errorResponse.arrayBuffer();
    return {
      statusCode: 500,
      headers: Object.fromEntries(errorResponse.headers.entries()),
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
    };
  }
};

export { handler };
