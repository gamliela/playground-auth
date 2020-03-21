# starter-nextjs-netlify

My starter kit for projects based on Next.js and Netlify.

This kit consists of the latest versions of:

- React
- TypeScript
- Next.js
- SCSS
- CSS Modules
- ESLint (with `react-hooks` plugin)
- Prettier
- Netlify

#### Start Development Server

```
$ yarn dev
```

#### Lint with ESLint

```
$ yarn lint
```

#### Prettify with Prettier

```
$ yarn prettify
```

#### Deploy to Netlify

```
$ yarn deploy
```

For the first deploy, the script will link your local environment to account and site on Netlify.
To deploy to prod, add the `--prod` parameter.

It is also possible to simulate prod environment on your local machine, using [Netlify Dev](https://www.netlify.com/products/dev/).

```
$ yarn dev-netlify
```
