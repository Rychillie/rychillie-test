/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  runtime: "experimental-edge",
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { searchParams } = new URL(req.url!);
  const title = searchParams.get("title");
  const top = searchParams.get("top");

  const lg = {
    fontSize: "72px",
    lineHeight: "80px",
    fontWeight: 800,
    fontFamily: "Inter",
    color: "#cabdff",
  };
  const md = {
    fontSize: "62px",
    lineHeight: "70px",
    fontWeight: 900,
    fontFamily: "Inter",
    color: "#cabdff",
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
          <p
            style={{
              fontFamily: "Inter",
              fontSize: "28px",
              marginBottom: "25px",
              color: "#c4c4c4",
            }}
          >
            {top}
          </p>

          <h1 style={title!.length < 60 ? lg : md}>{title}</h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "28px",
                color: "#c4c4c4",
              }}
            >
              rychillie.net
            </p>
            <img
              src="http://localhost:3000/rychillie-pencil.jpg"
              alt="Rychillie's avatar"
              width={70}
              height={70}
              style={{
                borderRadius: "100px",
              }}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default handler;
