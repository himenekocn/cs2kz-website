# CS2KZ Website

This project provides a website that communicates with the [CS2KZ API](https://github.com/KZGlobalTeam/cs2kz-api). You can view records, maps, courses, player profile and servers on this website.

## Development Setup

Set up the [API](https://github.com/KZGlobalTeam/cs2kz-api) following the instructions there.

Make sure your `Nodejs` version is on `20` or later. Install `pnpm` if you don't have it.

Clone this project and run `pnpm i` to install dependencies.

Make a copy of `.env.example` and rename it to `.env`, put the url of the API (e.g. `http://127.0.0.1:42069`) after the environment variable `VITE_API_URL`.

Run `pnpm dev` and go to `http://127.0.0.1:5173` in your browser when it's ready.