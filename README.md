# Rocket Addict

Browse upcoming rocket launches from The Space Devs’ Launch Library and save missions to a wish list in your browser.

## Local development

Use Node.js 22.12 or later in the 22.x series, or another version supported by the package manifest.

```sh
npm ci
npm run dev
```

## Production

Run `npm run lint` to check the source and `npm run build` to create the static site in `dist`. Use `npm run preview` to browse the production build locally at `/spacelaunch-livecode/`. The `npm run deploy` command publishes the build to GitHub Pages.
