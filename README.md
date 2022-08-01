This is a [Next.js](https://nextjs.org/) blog project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). site ui component designed with chakra ui.Generate static pages via [contentlayer.js](https://www.contentlayer.dev/) that supports mdx.

[线上预览](https://chakra-next-contentlayer-blog.vercel.app/)

## Usage

yarn install

## Getting Started

First, run the development server:

```bash
yarn dev
```

Run the production server

```bash
yarn build
```

It will auto general search meta data at `configs/search-meta.json` for algolia search on building

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to quickly deploy a project in Vercel, you can refer to:

[bilibili video](https://www.bilibili.com/video/BV1TV4y1j76t?share_source=copy_web&vd_source=a9339f4798c3797132386b56c98928b7)

## Function module

- The site search function is implemented using [algolia](https://www.algolia.com/doc/guides/building-search-ui/getting-started/react/)

- The comment function is implemented using [Discuss](https://github.com/discussjs/discuss) with
  some modifications I have made

- The access code authorization function is implemented using [Next-Auth](https://next-auth.js.org/).
  And the implementation in the project is to use two environment variables process.env.ACCESS_CODE and process.env.ADMIN_PASSWORD for request parameter verification

- ......

Thanks All !!

## Other

This is a web blog website that I made as an amateur during the learning process, some website modules have not been implemented. Maybe I will add some modules that I am interested in from time to time on the website. Right, it's up to me if I have the time, but I'll do it! -\_-
