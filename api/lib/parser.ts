import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "./types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname, query } = parse(req.url || "/", true);
  const { theme, subheader } = query || {};

  if (Array.isArray(theme)) {
    throw new Error("Expected a single theme");
  }

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let header = "";
  if (arr.length === 0) {
    header = "";
  } else if (arr.length === 1) {
    header = arr[0];
  } else {
    extension = arr.pop() as string;
    header = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    header: decodeURIComponent(header),
    subheader: subheader as string,
    theme: theme === "dark" ? "dark" : "light",
  };
  return parsedRequest;
}
