const axios = require("axios");
const config = require("../config")

class ServiceClient {
    static async getService(servicename) {
        try {
            const response = await axios.get(
                `http://${config.registry.url}/find/${servicename}/${config.registry.version}`
            )
            if (!response.data.ip) {
                throw new Error(`Could not find ${servicename}:${config.registry.version}`);
            }
            return response.data;
        }
        catch (error) {
            const errorMessage = (error.response && error.response.data && error.data.message) || error.message;
            throw new Error(errorMessage);
        }
    }

    static async callService(servicename, requestOptions) {
        try {
            const { ip, port } = this.getService(servicename);
            // eslint-disable-next-line no-param-reassign
            requestOptions.url = `http://${ip}:${port}${requestOptions.url}`;
            const response = await axios.get(requestOptions)
            return response.data;
        }
        catch (error) {
            const errorMessage = (error.response && error.response.data && error.data.message) || error.message;
            throw new Error(errorMessage);
        }
    }
}

module.exports = ServiceClient;