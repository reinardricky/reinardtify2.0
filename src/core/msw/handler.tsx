import { rest } from "msw";

const searchKey = "TEST DRIVE";
export const handler = [
	rest.get(
		`https://api.spotify.com/v1/search?q=${searchKey}&type=track`,
		(req, res, ctx) => {
			const title = req.url.searchParams;
			return res(ctx.json(title));
		}
	),
];
