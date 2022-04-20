import { rest } from "msw";
import { testItems } from "../../__test__/jsonData/tracks";

const searchParams = "TEST DRIVE";
export const handler = [
	rest.get(
		`https://api.spotify.com/v1/search?q=${searchParams}&type=track`,
		(req, res, ctx) => {
			// const title = req.url.searchParams;
			return res(ctx.json(testItems));
		}
	),
];
