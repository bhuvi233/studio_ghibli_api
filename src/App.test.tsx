import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

const server = setupServer(
    rest.get("https://ghibliapi.herokuapp.com/films", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: "2baf70d1-42bb-4437-b551-e5fed5a87abe",
                    title: "Castle in the Sky",
                    original_title: "天空の城ラピュタ",
                    original_title_romanised: "Tenkū no shiro Rapyuta",
                    image: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg",
                },
            ])
        );
    })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Check first film name is rendered on the screen", async () => {
    render(<App />);
    let film = await screen.findByText("Castle in the Sky");
    expect(film).toBeInTheDocument();
});

test("App handles the server error code 500 from the API fetch", async () => {
    server.use(
        rest.get("https://ghibliapi.herokuapp.com/films", (req, res, ctx) => {
            return res(ctx.status(500));
        })
    );
    render(<App />);
    let film = await screen.findByText(
        /Oops… something went wrong, try again 🤕/i
    );
    expect(film).toBeInTheDocument();
});
