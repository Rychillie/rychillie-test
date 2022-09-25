/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchParams } = new URL(req.url!);

  const title = searchParams.get("title") || "Rychillie";
  const top = searchParams.get("top") || "No top";
  const slug = searchParams.get("postSlug") || "No slug";

  const lg = {
    fontSize: "72px",
    lineHeight: "80px",
    fontWeight: 800,
    fontFamily: "Inter",
    color: "#e879f9",
  };
  const md = {
    fontSize: "62px",
    lineHeight: "70px",
    fontWeight: 900,
    fontFamily: "Inter",
    color: "#e879f9",
  };

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          background: "#161616",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "space-between",
            width: "1200px",
            height: "630px",
            padding: "80px",
          }}
        >
          <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <img
              src="http://rychillie-net-git-feat-og-image-rychillie.vercel.app/rychillie-pencil.jpg"
              alt="Rychillie's avatar"
              width={96}
              height={96}
              style={{
                marginRight: "24px",
                borderRadius: "100px",
              }}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "28px",
                  lineHeight: "42px",
                  textAlign: "left",
                  width: "100%",
                  color: "#fafafa",
                  padding: 0,
                  margin: 0,
                }}
              >
                {top}
              </p>
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "22px",
                  lineHeight: "26px",
                  textAlign: "left",
                  width: "100%",
                  color: "#60a5fa",
                  padding: 0,
                  margin: "0 0 8px 0",
                }}
              >
                {slug}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default handler;
