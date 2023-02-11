import React from 'react'
import styled from 'styled-components';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SupportIcon from '@mui/icons-material/Support';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import { useState } from "react";

import Stats from "../pages/Stats";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Newsletter from "../pages/Newsletter";
import Enquiry from "../pages/Enquiry";

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #F5F5F5;
    display: flex;
`
const Wrapper = styled.div`
    display: flex;
    height: 700px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: #205295;
    text-align: center;
    margin-top: 30px;
`

const Option = styled.div`
    width: 10vw;
    display: flex;
    margin: 30px;
    align-items: center;
    border: 1px solid #5BC0F8;
    padding: 10px;
    border-radius: 10px;
    background-color: #5BC0F8;
    &  :hover {
        cursor: pointer;
        transition: 0.1s all ease-in;
        transform: scale(1.1);
    }
`
const Button = styled.button`
    width: 100%;
    height: 100%;
    font-size: 17px;
    border: none;
    background-color: transparent;
    font-weight: 520;
    color: #fff;
`

const LContainer = styled.div`
    display: flex;
    flex: 1;
    background-color: #fff;
    border: 1px solid lightgray;
    flex-direction: column;
    align-items: center;
`

const MainWrapper = styled.div`
    display: flex;
`

const Sidebar = () => {
    const [element, setElement] = useState("home");
  return (
    <Container>
        <Wrapper>
            <LContainer>
                <Title>OPTION CONTROLS</Title>
                <Option onClick={()=>setElement("home")}>
                    <HomeOutlinedIcon style={{color:"#fff"}}/>
                    <Button>Home</Button>
                </Option>
                <Option onClick={()=>setElement("products")}>
                    <AddShoppingCartOutlinedIcon style={{color:"#fff"}}/>
                    <Button>Products</Button>
                </Option>
                <Option onClick={()=>setElement("categories")}>
                    <CategoryIcon style={{color:"#fff"}}/>
                    <Button>Category</Button>
                </Option>
                <Option onClick={()=>setElement("newsletter")}>
                    <AllInboxIcon style={{color:"#fff"}}/>
                    <Button>Newsletters</Button>
                </Option>
                <Option onClick={()=>setElement("enquiries")}>
                    <SupportIcon style={{color:"#fff"}}/>
                    <Button>Enquiry</Button>
                </Option>
            </LContainer>
        </Wrapper>
        <MainWrapper>
            {element === "home" && <Stats />}
            {element === "products" && <Products />}
            {element === "categories" && <Category />}
            {element === "newsletter" && <Newsletter />}
            {element === "enquiries" && <Enquiry />}
        </MainWrapper>
    </Container>
  );
}

export default Sidebar;