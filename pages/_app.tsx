import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  ReadyPage,
  ErrorComponent,
  AuthPage,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-nextjs-router";
//import dataProvider from "@pankod/refine-simple-rest";
import { dataProvider } from "../src/dataProvider";
import "@pankod/refine-antd/dist/reset.css";
import { AntdInferencer } from "@pankod/refine-inferencer/antd";
import { appWithTranslation, useTranslation } from "next-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { ColorModeContextProvider } from "@contexts";
import {
  Title,
  Header,
  Sider,
  Footer,
  Layout,
  OffLayoutArea,
} from "@components/layout";
import { authProvider } from "src/authProvider";
import { FunnelEdit } from "@components/resources/funnels/edit";
import { VariationEdit } from "@components/resources/variations/edit";
import { StepEdit } from "@components/resources/steps/edit";
import { VariationCreate } from "@components/resources/variations/create";
import { StepCreate } from "@components/resources/steps/create";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    if(typeof API_URL !== "string"){ throw("Please set NEXT_PUBLIC_API_URL") }

    const { t, i18n } = useTranslation();

    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
           changeLocale: (lang: string) => i18n.changeLanguage(lang),
           getLocale: () => i18n.language,
    };

    return (
        <ColorModeContextProvider>
            <RefineKbarProvider>
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={{
                        default: dataProvider(API_URL)
                    }}
                    notificationProvider={notificationProvider}
                    ReadyPage={ReadyPage}
                    catchAll={<ErrorComponent />}
                    resources={[
                        {
                            name: "funnels",
                            list: AntdInferencer,
                            edit: FunnelEdit,
                            show: AntdInferencer,
                            create: AntdInferencer,
                            canDelete: true,
                        },
                        {
                            name: "variations",
                            edit: VariationEdit,
                            show: AntdInferencer,
                            create: VariationCreate,
                            canDelete: true,
                        },
                        {
                            name: "steps",
                            edit: StepEdit,
                            show: AntdInferencer,
                            create: StepCreate,
                            canDelete: true,
                        },
                    ]}
                    Title={Title}
                    Header={Header}
                    Sider={Sider}
                    Footer={Footer}
                    Layout={Layout}
                    OffLayoutArea={OffLayoutArea}
                    authProvider={authProvider}
                    LoginPage={AuthPage}
                    i18nProvider={i18nProvider}
                >
                    <Component {...pageProps} />
                </Refine>
            </RefineKbarProvider>
        </ColorModeContextProvider>
    );
}

export default appWithTranslation(MyApp);
