import request from "src/@core/utils/request";

const language = 3


export const login = async (params) => {
    const res = await request.post("/admin/login", {
        ...params,
        language,
    });

    return res;
};