This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
### build

### read


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Auto Generate

you can generate (Page, Page with parameter route, component, slice redux or api server in "pages / api")

## Generate a Page also generate a type file for the page

```bash

yarn generate --model=page --name=<PageName>

// or

npm run generate --model=page --name=<PageName>
```

## Generate a Page with parameter also generate a type file for the page

```bash

yarn generate --model=page --name=<PageName> --folderName=<folderNameMatchWithPage>

// or

npm run generate --model=page --name=<PageName> --folderName=<folderNameMatchWithPage>
```

## Generate slice redux

```bash

yarn generate --model=slice --name=<sliceName>

// or

npm run generate --model=page --name=<sliceName>
```

## Generate component

```bash

yarn generate --model=component --name=<componentName>

// or

npm run generate --model=component --name=<componentName>
```
## Generate component Global

```bash

yarn generate --model=componentGlobal --name=<componentName>

// or

npm run generate --model=componentGlobal --name=<componentName>
```

## Generate swagger code gen

```bash

yarn generate-swagger --swagger=<swaggerJsonFile> --outputDir=<pathName>

// or

npm run generate-swagger --swagger=<swaggerJsonFile> --outputDir=<pathName>
```
=========

>>>>>>>>> Temporary merge branch 2
## Generate api path server

```bash

yarn generate --model=apiPath --name=<pathName>

// or

npm run generate --model=apiPath --name=<pathName>
```



