import { BASE_URL } from "@/utils/url";


export const getArrivals = async (STRAPI_API_TOKEN: string, SESSION: string) => {
    const options = {
        method: "GET",
        headers: {
            Authorization: "Bearer " + STRAPI_API_TOKEN,
            Cookie: `session=${SESSION}`
        },
    };

    const res = await fetch(`${BASE_URL}/api/v1/jobCategories/categories`, options);
    const data = await res.json();

    return data.data;
};
