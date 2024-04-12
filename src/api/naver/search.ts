import axios from "axios";

export const search = async (query: string) => {
  console.log("query", query);
  return await axios.get("/v1/search/local.json", {
    params: {
      query: query,
      display: 5,
      start: 1,
      sort: "random",
    },
    headers: {
      "X-Naver-Client-Id": import.meta.env.VITE_NAVER_SEARCH_API_CLIENT_ID,
      "X-Naver-Client-Secret": import.meta.env
        .VITE_NAVER_SEARCH_API_CLIENT_SECRET,
    },
  });
};
