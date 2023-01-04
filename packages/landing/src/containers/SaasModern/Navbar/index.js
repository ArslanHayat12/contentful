import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import NavbarWrapper from "common/components/Navbar";
import Drawer from "common/components/Drawer";
import Button from "common/components/Button";
import Logo from "common/components/UIElements/Logo";
import Box from "common/components/Box";
import HamburgMenu from "common/components/HamburgMenu";
import Container from "common/components/UI/Container";
import { DrawerContext } from "common/contexts/DrawerContext";
import getPage from "common/components/ContentFull/contentFull";
import { MENU_ITEMS } from "common/data/SaasModern";
import ScrollSpyMenu from "common/components/ScrollSpyMenu";

import LogoImage from "common/assets/image/saasModern/logo-white.png";
import LogoImageAlt from "common/assets/image/saasModern/logo.png";
import { openModal } from "@redq/reuse-modal";
import EmailModal from "containers/App/emailModal";

const Navbar = ({ navbarStyle, logoStyle, button, row, menuWrapper }) => {
  const { state, dispatch } = useContext(DrawerContext);
  const [data, setData] = useState();
  const [menu,setMenu] =useState();
  const generateData = (items) => {
    return Object.assign(
      ...items.map((entity) => ({ [entity.fields.uid]: entity.fields }))
    );
  };

  useEffect(async () => {
    const params = {
      content_type: "saasModern",
    };
    const params1={
      content_type:'menuItems'
    }
    let client = getPage();
    let result = await client.getEntries(params);
    const mappedData = generateData(result?.items);
    setData(mappedData);
    
    let result1=await client.getEntries(params1)
    setMenu(result1?.items[0]?.fields?.menu||[])
  }, []);
  console.log('menu')
  console.log(menu)
  console.log("Logo Data");
  console.log(data?.logo?.image[0].fields.file.url);
  const imageSrc = `https:${data?.logo?.image[0].fields.file.url}`;
  const altImage = `https:${data?.logo?.image[1].fields.file.url}`;
  // Toggle drawer
  const toggleHandler = () => {
    dispatch({
      type: "TOGGLE",
    });
  };

  const openEmailModal = () => {
    console.log("hello here is ");
    openModal({
      config: {
        //disableDragging: true,
        width: "100%",
        height: "100%",
        animationFrom: { transform: "translateY(100px)" }, // react-spring <Spring from={}> props value
        animationTo: { transform: "translateY(0)" }, //  react-spring <Spring to={}> props value
        transition: {
          mass: 1,
          tension: 180,
          friction: 26,
        },
      },
      component: EmailModal,
      componentProps: { data: { title: "GET STARTED" } },
    });
  };
  return (
    <NavbarWrapper {...navbarStyle} className="saas_navbar">
      <Container>
        <Box {...row}>
          <Logo
            href="#"
            logoSrc={imageSrc}
            title="Portfolio"
            logoStyle={logoStyle}
            className="main-logo"
          />
          <Logo
            href="#"
            logoSrc={altImage}
            title="Portfolio"
            logoStyle={logoStyle}
            className="logo-alt"
          />
          <Box {...menuWrapper}>
            <ScrollSpyMenu
              className="main_menu"
              menuItems={menu||[]}
              offset={-70}
            />
            {/* <Link href="#">
              <a className="navbar_button"   style={{ margin: "0 10px" }} >
                <Button
                  {...button}
                  onClick={() => openEmailModal()}
                  title="GET STARTED"
                />
              </a>
            </Link> */}
            <Link href="#">
              <a className="navbar_button"   style={{ margin: "0 10px" }}>
                <Button
                  {...button}
                  onClick={() =>
                    window.open("https://dev.d21e91suc2nlmq.amplifyapp.com")
                  }
                  title="SIGN UP"
                />
              </a>
            </Link>
            <Drawer
              width="420px"
              placement="right"
              drawerHandler={<HamburgMenu barColor="#fff" />}
              open={state.isOpen}
              toggleHandler={toggleHandler}
            >
              <ScrollSpyMenu
                className="mobile_menu"
                menuItems={menu}
                drawerClose={true}
                offset={-100}
              />
              {/* <Link href="#"  >
                <a className="navbar_drawer_button" style={{ margin: "10px 0" }}>
                  <Button
                    {...button}
                    onClick={() => openEmailModal()}
                    title="GET STARTED"
                  />
                </a>
              </Link> */}
              <Link href="#" >
                <a className="navbar_drawer_button"  style={{ margin: "10px 0" }}>
                  <Button
                    {...button}
                    onClick={() =>
                      window.open("https://dev.d21e91suc2nlmq.amplifyapp.com")
                    }
                    title="SIGN UP"
                  />
                </a>
              </Link>
            </Drawer>
          </Box>
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  navbarStyle: {
    minHeight: "70px",
    display: "block",
  },
  row: {
    flexBox: true,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logoStyle: {
    maxWidth: ["120px", "130px"],
  },
  button: {
    type: "button",
    fontSize: "13px",
    fontWeight: "700",
    borderRadius: "4px",
    pl: "15px",
    pr: "15px",
    colors: "secondaryWithBg",
    minHeight: "auto",
    height: "40px",
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
  },
};

export default Navbar;
