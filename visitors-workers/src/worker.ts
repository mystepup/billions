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
  // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
  view_counter: KVNamespace;
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

function handleHome() {
  return new Response(home, {
    headers: {
      'Content-Type': 'text/html;charset=utf-8',
    },
  });
}

function handleBadRequest() {
  return new Response(null, {
    status: 400,
  });
}

async function handleVisit(searchParams: URLSearchParams, env: Env) {
  const page = searchParams.get('page');
  if (!page) {
    return handleBadRequest();
  }
  const kvPage = await env.view_counter.get(page);
  let value = 1;
  if (!kvPage) {
    await env.view_counter.put(page, value.toString());
  } else {
    value = parseInt(kvPage) + 1;
    await env.view_counter.put(page, value.toString());
  }
  return new Response(
    JSON.stringify({
      value: value.toString(),
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

function handleNotFound() {
  return new Response(null, { status: 404 });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const { pathname, searchParams } = new URL(request.url);
    switch (pathname) {
      case '/':
        return handleHome();
      case '/visit':
        return handleVisit(searchParams, env);
      default:
        return handleNotFound();
    }
  },
};
