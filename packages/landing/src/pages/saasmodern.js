import React, { Fragment, useEffect, useState } from "react";
import Head from "next/head";
import { ThemeProvider } from "styled-components";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import { saasModernTheme } from "common/theme/saasModern";
import Loader from '../common/components/Loader';
import ResetCSS from "common/assets/css/style";
import {
  GlobalStyle,
  ContentWrapper,
} from "containers/SaasModern/sassModern.style";

import BannerSection from "containers/SaasModern/Banner";
import Navbar from "containers/SaasModern/Navbar";
import WorkingProcessSection from "containers/SaasModern/WorkingProcess";
import PricingSection from "containers/SaasModern/Pricing";
import PartnerSection from "containers/SaasModern/Partner";
import FaqSection from "containers/SaasModern/Faq";
import TrialSection from "containers/SaasModern/Trial";
import InfoSection from "containers/SaasModern/Info";
import FeatureSection from "containers/SaasModern/Feature";
import UpdateScreen from "containers/SaasModern/UpdateScreen";
import TestimonialSection from "containers/SaasModern/Testimonial";
import getPage from "../common/components/ContentFull/contentFull";
import Footer from "containers/SaasModern/Footer";

const SaasModern = () => {
  const [data, setData] = useState(null);
  const generateData = (items) => {
    return Object.assign(
      ...items.map((entity) => ({ [entity.fields.uid]: entity.fields }))
    );
  };

  useEffect(async () => {
    const params = {
      content_type: "saasModern",
    };
    let client = getPage();
    let result = await client.getEntries(params);
    const mappedData = generateData(result?.items);
    setData(mappedData);

    //   setData(result.items)
  }, []);
  console.log(data);

  return !data ? (
    <div style={{display:"flex",justifyContent:"center", alignItems:"center",height:"100vh"}}>
      <Loader loaderColor={"#1877F2"} width="100px" height="100px"/>
    </div>
  ) : (
    <ThemeProvider theme={saasModernTheme}>
      <Fragment>
        <Head>
          <title>SaaS | A react next landing page</title>
          <meta name="Description" content="React next landing page" />
          <meta name="theme-color" content="#ec5555" />
          {/* Load google fonts */}
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,900|Open+Sans:400,400i,600,700"
            rel="stylesheet"
          />
        </Head>

        <ResetCSS />
        <GlobalStyle />

        <ContentWrapper>
          <Sticky top={0} innerZ={9999} activeClass="sticky-nav-active">
            <DrawerProvider>
              <Navbar />
            </DrawerProvider>
          </Sticky>
          {data && (
            <>
              {console.log(data["platform"])}
              <BannerSection
                bannerContent={data["platform"]}
                contactUsContent={data["contact"]}
                videoContent={data["video"]}
              />
              <WorkingProcessSection
                workingProcessContent={data["working_process"]}
              />
              <InfoSection
                infoSectionContent={data["visitors"]}
                howWorkContent={data["works"]}
              />
              <FeatureSection featureContent={data["features"]} />
              <UpdateScreen updateContent={data["update"]} />
              <PricingSection pricingContent={data["pricing"]} />
              <PartnerSection partnerContent={data["business"]} />
              <TestimonialSection />
              <FaqSection faqContent={data["questions"]} />
              <TrialSection />
              <Footer
                securityContent={data["security"]}
                aboutContent={data["about"]}
                privacyContent={data["privacy"]}
              />
            </>
          )}
        </ContentWrapper>
      </Fragment>
    </ThemeProvider>
  );
};
export default SaasModern;
