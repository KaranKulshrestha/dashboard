import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CategoryIcon from "@mui/icons-material/Category";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import SupportIcon from "@mui/icons-material/Support";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  height: 90%;
  margin-right: 80%;
`;

const Wrapper = styled.div`
  width: 100vh;
  margin-left: 30px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
  margin-left: 15%;
  display: flex;
  flex-wrap: wrap;
`;

const Heady = styled.h1`
  color: white;
  align-items: center;
`;

const Count = styled.h2`
  color: white;
  margin-top: 10px;
`;

const Sdiv = styled.div`
  margin-top: 7%;
  margin-left: 15%;
  border: 1px solid white;
  width: 250px;
  height: 200px;
  background-color: #5bc0f8;
  display: flex;
  border-radius: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & :hover {
    cursor: pointer;
    transition: 0.1s all ease-in-out;
    transform: scale(1.1);
  }
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 80px;
  color: #205295;
  text-align: center;
`;

export default function Stats() {
  const [categories, setCategories] = useState("");
  const [enqueries, setEnqueries] = useState("");
  const [newsletter, setNewsletter] = useState("");
  const [products, setProducts] = useState("");

  const getStats = async () => {
    try {
      await axios.get("https://mysterious-crab-baseball-cap.cyclic.app/api/getStats").then((res) => {
        const { categories, enqueries, newsletter, products } = res.data.data;
        setCategories(categories);
        setEnqueries(enqueries);
        setNewsletter(newsletter);
        setProducts(products);
        console.log(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStats();
  });

  return (
    <Container>
      <Title>Today's Statistics</Title>
      <Wrapper>
        <Sdiv>
          <Heady>
            <AddShoppingCartOutlinedIcon />
            Products
          </Heady>
          <Count>{products}</Count>
        </Sdiv>

        <Sdiv>
          <Heady>
            <CategoryIcon />
            Categories
          </Heady>
          <Count>{categories}</Count>
        </Sdiv>

        <Sdiv>
          <Heady>
            <AllInboxIcon />
            Newsletters
          </Heady>
          <Count>{newsletter}</Count>
        </Sdiv>

        <Sdiv>
          <Heady>
            <SupportIcon />
            Enquieries
          </Heady>
          <Count>{enqueries}</Count>
        </Sdiv>
      </Wrapper>
    </Container>
  );
}
