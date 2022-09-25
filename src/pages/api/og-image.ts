import { withOGImage } from "next-api-og-image";

enum QueryParams {
  "id",
}

export default withOGImage<"query", keyof typeof QueryParams>({
  strategy: "query",
  type: "png",
  width: 1200,
  height: 630,
  cacheControl: "max-age 3600, must-revalidate",
  template: {
    html: async ({ id }: any) => `
      <html>
        <head>
          <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <h1 class="flex flex-row text-6xl text-blue-300">${id}<span>💻</span></h1>
        </body>
      </html>
    `,
  },
});
