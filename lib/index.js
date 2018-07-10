'user strict'

const Joi = require('joi')
const Pkg = require('../package.json')

const singleOption = Joi.object({
    timeRecord: Joi.boolean().default(false),
    cors: Joi.boolean().default(false)
})

async function register(server, pluginOptions) {
    let options
    try {
        options = await singleOption.validate(pluginOptions)
    } catch (err) {
        throw err
    }
    if (options.timeRecord) {
        server.ext('onRequest', (request, h) => {
            request.headers['x-req-start'] = (new Date()).getTime();
            return h.continue;
        });
        server.ext('onPreResponse', (request, h) => {
            let start = parseInt(request.headers['x-req-start']);
            let end = (new Date()).getTime();
            if (!request.response.isBoom) {
                request.response.header('x-req-start', start).header('x-res-end', end).header('x-time', (end - start) + 'ms');
            }
            return h.continue;
        });
    }

    if (options.cors) {
        server.ext('onPreResponse', (request, h) => {
            if (!request.response.isBoom) {
                request.response.header('Access-Control-Allow-Origin', '*');
            }
            return h.continue;
        });
    }

}
exports.plugin = {
    register: register,
    pkg: Pkg
}