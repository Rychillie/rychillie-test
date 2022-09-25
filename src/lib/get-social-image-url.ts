const isDev = process.env.NODE_ENV || "development";

export function getSocialImageUrl(pageId: string) {
  try {
    const url = new URL(
      `/api/social-image`,
      `https://rychillie-net.vercel.app`
    );

    if (pageId) {
      url.searchParams.set("id", pageId);
      return url.toString();
    }
  } catch (err) {
    console.warn("error invalid social image url", pageId, err.message);
  }

  return null;
}
