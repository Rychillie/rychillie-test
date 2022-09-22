import {
  allBlogEnUs,
  allBlogPtBRs,
  allDocuments,
} from "contentlayer/generated";
import type { BlogEnUS, BlogPtBR } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import LayoutBase from "@layouts/PostLayout";

type Params = {
  params: {
    slug: string;
  };
};

export function getStaticPaths() {
  const enPaths = allBlogEnUs.map((post) => ({
    params: { slug: post.slug },
    locale: "en-US",
  }));

  const ptPaths = allBlogPtBRs.map((post) => ({
    params: { slug: post.slug },
    locale: "pt-BR",
  }));

  return {
    paths: enPaths.concat(ptPaths),
    fallback: false,
  };
}

export function getStaticProps({ params }: Params) {
  const post = allDocuments.find((post) => post.slug === params.slug);

  return {
    props: {
      post,
    },
  };
}

type VideoProps = {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  src: string;
  type: string;
};

function VideoWithTheme(
  { autoplay, loop, muted, playsInline, src, type, controls }: VideoProps,
  { props }: any
) {
  return (
    <video
      loop={loop ? loop : true}
      muted={muted ? muted : true}
      playsInline={playsInline ? playsInline : true}
      width="100%"
      autoPlay={autoplay ? autoplay : true}
      controls={controls ? controls : false}
      {...props}
    >
      <source src={src} type={type} />
    </video>
  );
}

export default function BlogPost({ post }: { post: BlogEnUS | BlogPtBR }) {
  const locale = post?.type === "BlogPtBR" ? "pt-BR" : "en-US";
  const Component = useMDXComponent(post.body.code);

  return (
    <LayoutBase title={post.title} locale={locale} thumb={post.image}>
      <article className="font-normal text-lg text-neutral-600 dark:text-neutral-400 flex flex-col gap-4">
        <Component
          components={
            {
              Video: VideoWithTheme,
            } as any
          }
        />
      </article>
    </LayoutBase>
  );
}
