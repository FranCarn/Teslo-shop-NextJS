import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import { lightTheme } from "../themes";
import { SessionProvider } from "next-auth/react";
import { AuthProvider, CartProvider, UiProvider } from "../context";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => res.json()),
        }}
      >
        <AuthProvider>
          <CartProvider>
            <UiProvider>
              <ThemeProvider theme={lightTheme}>
                <CssBaseline />

                <Component {...pageProps} />
              </ThemeProvider>
            </UiProvider>
          </CartProvider>
        </AuthProvider>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
