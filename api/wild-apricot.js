"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wildApricot = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("./config");
class WildApricot {
    constructor() {
        this.host = '';
        this.isAuthenticated = false;
        this.headers = { 'Authorization': '' };
    }
    async authenticate() {
        console.log(`Authenticating Wild Apricot`);
        const host = 'https://oauth.wildapricot.org';
        const url = `${host}/auth/token`;
        const auth = Buffer
            .from(`APIKEY:${config_1.WILD_APRICOT_API_KEY}`)
            .toString('base64');
        const result = await node_fetch_1.default(url, {
            method: 'post',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&scope=auto'
        }).then((response) => response.json());
        const permissions = result.Permissions[0];
        this.isAuthenticated = true;
        this.headers['Authorization'] = `Bearer ${result.access_token}`;
        this.host = `https://api.wildapricot.org/v2.2/Accounts/${permissions.AccountId}`;
        const scopes = permissions.AvailableScopes.join('. ');
        console.log(`Received access token. Available scopes: ${scopes}`);
    }
    async getEvents() {
        await this.authenticate();
        const url = `${this.host}/Events`;
        const result = await node_fetch_1.default(url, { headers: this.headers })
            .then((response) => response.json());
        return result['Events'];
    }
}
exports.wildApricot = new WildApricot();
//# sourceMappingURL=wild-apricot.js.map