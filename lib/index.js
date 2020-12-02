"user strict";

const Joi = require("joi");
const Pkg = require("../package.json");

const singleOption = Joi.object({
    timeRecord: Joi.boolean().default(false),
    cors: Joi.object({
        "Access-Control-Allow-Origin": Joi.string().default("*"), //指定允许其他域名访问
        "Access-Control-Allow-Credentials": Joi.boolean()
            .optional()
            .default(true), //是否允许后续请求携带认证信息（cookies）,该值只能是true,否则不返回
        "Access-Control-Max-Age": Joi.number().optional().default(1800), //预检结果缓存时间,也就是上面说到的缓存啦
        "Access-Control-Allow-Methods": Joi.string().optional(), //允许的请求类型
        "Access-Control-Allow-Headers": Joi.string().optional(), //允许的请求头字段
    }).optional(),
});

async function register(server, pluginOptions) {
    let options;
    try {
        options = await singleOption.validate(pluginOptions);
    } catch (err) {
        throw err;
    }
    if (options.timeRecord) {
        server.ext("onRequest", (request, h) => {
            request.headers["x-req-start"] = new Date().getTime();
            return h.continue;
        });
        server.ext("onPreResponse", (request, h) => {
            let start = parseInt(request.headers["x-req-start"]);
            let end = new Date().getTime();
            if (!request.response.isBoom) {
                request.response
                    .header("x-req-start", start)
                    .header("x-res-end", end)
                    .header("x-time", end - start + "ms");
            }
            return h.continue;
        });
    }

    if (options.cors) {
        server.ext("onPreResponse", (request, h) => {
            if (!request.response.isBoom) {
                for (let key in options.cors) {
                    request.response.header(key, options.cors[key]);
                }
            }
            return h.continue;
        });
    }
}
exports.plugin = {
    register: register,
    pkg: Pkg,
};
