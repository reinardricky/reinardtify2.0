import { setupServer } from "msw/node";
import { handler } from "./handler";

export const server = setupServer(...handler);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
