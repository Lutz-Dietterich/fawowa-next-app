import "./global.css";
import Layout from "../components/Layout/index";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
