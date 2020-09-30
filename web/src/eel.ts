export interface Response {
  success: boolean;
  message: string;
}

export interface EelInterface {
  submit: (
    text: string,
    value: number,
    flags: string[]
  ) => () => Promise<string>;
}

declare var eel: EelInterface;

export class EelApi {
  submit(text: string, value: number, flags: string[]): Promise<Response> {
    return new Promise<Response>((resolve) => {
      eel.submit(text, value, flags)().then((response: string) => {
        resolve(JSON.parse(response));
      })
    })
  }
}

const eelApi: EelApi = new EelApi();
export default eelApi;
