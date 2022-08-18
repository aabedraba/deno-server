import { serve } from "https://deno.land/std@0.152.0/http/server.ts";

const paths = ["/validated", "/hello"];
const urlPatterns = paths.map((path) => new URLPattern({ pathname: path }));

const handler = async (req: Request) => {
  const match = urlPatterns.find((urlPattern) => urlPattern.exec(req.url));
  if (!match) {
    return new Response("Path not found", { status: 404 });
  }

  if (match.pathname === "/hello" && req.method === "GET") {
    return new Response("Hello world");
  }

  if (match.pathname === "/validated" && req.method === "POST") {
    const bodyStream = req.body?.pipeThrough(new TextDecoderStream());

    const chunks: string[] = [];
    for await (const chunk of bodyStream || new ReadableStream()) {
      chunks.push(chunk);
    }

    const requestBody = JSON.parse(chunks.toString());

    const responseBody = {
      message: `Hello ${requestBody.name}`,
    };
    return new Response(JSON.stringify(responseBody), { status: 200 });
  }

  return new Response("Path not found", { status: 404 });
};

await serve(handler, { port: 8080 });

