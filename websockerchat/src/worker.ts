/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// @ts-ignore
import home from './home.html';

export interface Env {
  websocketchat: KVNamespace;
  CHAT: DurableObjectNamespace;
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  // MY_KV_NAMESPACE: KVNamespace;
  //
  // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
  // MY_DURABLE_OBJECT: DurableObjectNamespace;
  //
  // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
  // MY_BUCKET: R2Bucket;
  //
  // Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
  // MY_SERVICE: Fetcher;
  //
  // Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
  // MY_QUEUE: Queue;
}

export class ChatRoom {
  state: DurableObjectState;
  users: WebSocket[];
  messages: string[];
  constructor(state: DurableObjectState, env: Env) {
    this.state = state;
    this.users = [];
    this.messages = [];
  }

  handleConnect(req: Request) {
    const pairs = new WebSocketPair();
    this.handleWebSocket(pairs[1]);
    return new Response(null, { status: 101, webSocket: pairs[0] });
  }

  handleWebSocket(webSocket: WebSocket) {
    webSocket.accept();
    this.users.push(webSocket);
    webSocket.send(
      JSON.stringify({
        message: 'hello from backend',
      })
    );
    this.messages.forEach((message) => webSocket.send(message));

    webSocket.addEventListener('message', (event) => {
      this.messages.push(event.data.toString());
      this.users.forEach((user) => user.send(event.data));
    });
  }

  handleHome() {
    return new Response(home, {
      headers: {
        'Content-Type': 'text/html;charset=utf-8',
      },
    });
  }

  handleNotFound() {
    return new Response(null, { status: 404 });
  }
  async fetch(req: Request) {
    const { pathname } = new URL(req.url);
    switch (pathname) {
      case '/':
        return this.handleHome();
      case '/connect':
        return this.handleConnect(req);
      default:
        return this.handleNotFound();
    }
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const id = env.CHAT.idFromName('CHAT');
    const durableObject = env.CHAT.get(id);
    const response = await durableObject.fetch(request);
    return response;
  },
};
