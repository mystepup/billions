import { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then(res => res.json())

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SWRConfig value={{ fetcher }}>
            <div>
                <Component {...pageProps} />
            </div>
        </SWRConfig>
    )
}

export default MyApp;