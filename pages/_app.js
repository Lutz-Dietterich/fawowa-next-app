import GlobalStyle from "../styles";
import Layout from "../components/Layout/index";

export default function App({ Component, pageProps }) {
    return (
        <>
            <GlobalStyle />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    );
}
