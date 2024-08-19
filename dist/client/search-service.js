var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
import camelcaseKeys from "camelcase-keys";
const search_endpoint = "/search";
const aggregate_endpoint = "/aggregate";
;
export class AxiosSearchServiceClient {
    //private abortController: AbortController;
    constructor(config) {
        //this.abortController = new AbortController();
        this.client = axios.create({
            baseURL: `${config.host}/api/v1/${config.index}`
        });
    }
    makeRequest(method, endpoint, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield this.client.request({
                method: method,
                url: endpoint,
                data: data
                //signal: this.abortController.signal
            });
            if (resp.status >= 300) {
                throw new Error(resp.data.toString());
            }
            if (!resp.data) {
                throw new Error("unknown error, empty response body");
            }
            return camelcaseKeys(resp.data);
        });
    }
    search(request) {
        return this.makeRequest("POST", search_endpoint, request);
    }
    aggregate(request) {
        return this.makeRequest("POST", aggregate_endpoint, request);
    }
}
