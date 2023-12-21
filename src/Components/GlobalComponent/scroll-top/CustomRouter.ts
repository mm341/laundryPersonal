import { NextRouter } from "next/router";

// Define custom types or interfaces if needed
interface CustomParams {
  id: string;
}

// Extend the NextRouter interface with custom types
interface CustomRouter extends NextRouter {
  query: {
    // Extend the query parameters if needed
    customParam?: string;
  };
  // Extend the params with custom types
  params: CustomParams;
}

export default CustomRouter;
