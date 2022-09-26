import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";

import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeCodeTitles from "rehype-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";

const computedFields: ComputedFields = {
  readingTime: { type: "json", resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length,
  },
  tweetIds: {
    type: "json",
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      const tweetIDs = tweetMatches?.map(
        (tweet: any) => tweet.match(/[0-9]+/g)[0]
      );
      return tweetIDs ?? [];
    },
  },
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ""),
  },
};

const BlogEN = defineDocumentType(() => ({
  name: "BlogEnUS",
  filePathPattern: "blog/en-US/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    image: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

const BlogBR = defineDocumentType(() => ({
  name: "BlogPtBR",
  filePathPattern: "blog/pt-BR/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    image: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

const CourseEN = defineDocumentType(() => ({
  name: "CourseEnUS",
  filePathPattern: "courses/en-US/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    external_url: { type: "string", required: true },
    course_length: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

const CourseBR = defineDocumentType(() => ({
  name: "CoursePtBR",
  filePathPattern: "courses/pt-BR/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    external_url: { type: "string", required: true },
    course_length: { type: "string", required: true },
    tags: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}));

const Newsletter = defineDocumentType(() => ({
  name: "Newsletter",
  filePathPattern: "newsletter/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    description: { type: "string", required: true },
    link: { type: "string", required: true },
  },
  computedFields,
}));

const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: "snippets/*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    logo: { type: "string", required: true },
  },
  computedFields,
}));

const OtherPage = defineDocumentType(() => ({
  name: "OtherPage",
  filePathPattern: "*.mdx",
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
  },
  computedFields,
}));

const contentLayerConfig = makeSource({
  contentDirPath: "./content",
  documentTypes: [
    BlogEN,
    BlogBR,
    Snippet,
    OtherPage,
    Newsletter,
    CourseEN,
    CourseBR,
  ],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypeCodeTitles,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
          },
        },
      ],
    ],
  },
});

export default contentLayerConfig;
