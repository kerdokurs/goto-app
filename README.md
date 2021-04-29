# gotoAndPlay internship app

This is the internship task app for gotoAndPlay 10th anniversary.

The app is build with [Svelte](https://svelte.dev/) (using [Snowpack](https://www.snowpack.dev/)) and Typescript.

## Features

- App spawns random rockets that explode when they are at their highest
- Rockets will explode into confetti. Although there is a problem with this (addressed lower).
- "Bumping" into the rockets with the mouse will cause them to slightly change direction according to the distance between the mouse and rocket

## Running

- Navigate into the app root directory
- Run `npm i`
- For **development** environment run `npm start`. This will start a Snowpack development server.
- For **production** build run `npm run build`. This will bundle the app to the `build` directory. There you can open the app. It is recommended to use a simple single-page-application server to run the app. I recommend live-server.

## Bugs

- There is a bug with exploding the rocket. I don't quite know what and why it's happening but when exploding the rocket, the acceleration vector for the confetti is not calculated properly. It should evenly spread from the rocket. The acceleration vector is calculated using simple trigonometry `[cos(a), sin(a)]` for each confetti "launching angle" around the rocket but all the vectors seem to be same when updating the confetti entity. Although the vectors seem correct after creating them and before updating them.
  **So just imagine the rocket exploding into a random amount of confetti evenly distributed around the rocket 😎**
