import { IAxiosRequestConfig } from "./types";
import xhr from "./xhr";

function axios(config: IAxiosRequestConfig): void {
  xhr(config);
}

export default axios;
