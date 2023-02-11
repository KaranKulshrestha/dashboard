import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import loader from "../assets/loader.gif";

import TextField from "@mui/material/TextField";
import Fileupload from "../components/Fileupload";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import axios from "axios";

const Container = styled.div`
  width: 83vw;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Wrapper = styled.div`
  padding: 10px;
`;

const columns = [
  { field: "id", headerName: "ID", width: 270 },
  {
    field: "Product Image",
    headerName: "Product Image",
    width: 350,
    renderCell: (params) => {
      return (
        <Wrapper>
          <img src={params.row.image} style={{ width: "100%" }} />
        </Wrapper>
      );
    },
  },
  { field: "name", headerName: "Product Name", width: 130 },
  { field: "description", headerName: "Description", width: 700 },
  { field: "category", headerName: "Category", width: 700 },
];

const Products = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [deletedRows, setDeletedRows] = useState([]);
  const [category, setCategory] = React.useState("");
  const [optionList, setOptionList] = useState([]);

  const getProduct = async () => {
    axios
      .get("https://mysterious-crab-baseball-cap.cyclic.app/api/getProducts")
      .then((res) => {
        const data = res.data.data;
        setTableData(data);
      });
  };

  const fetchData = async () => {
    await axios
      .get("https://mysterious-crab-baseball-cap.cyclic.app/api/getCategory")
      .then((response) => {
        const { data } = response.data;
        console.log(data);
        if (response.status === 200) {
          //check the api call is success by stats code 200,201 ...etc
          setOptionList(data);
        } else {
          //error handle section
          console.log("something went wrong");
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
    fetchData();
  }, []);

  const handleChangemenu = (event) => {
    setCategory(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const onHandleChange = (e) => {
    setTitle(e.target.value);
  };

  const onHandleChangeDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleCallback = (data) => {
    setImage(data);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleDelete = async () => {
    axios.post(
      "https://mysterious-crab-baseball-cap.cyclic.app/api/deleteProducts",
      {
        data: deletedRows,
      }
    );
    alert("successfully deleted");
    window.location.reload(false);
    console.log(deletedRows);
  };

  const handleForm = async () => {
    if (image.type.match("image.*")) {
      const base64 = await convertBase64(image);
      setLoading(true);
      axios
        .post(
          "https://mysterious-crab-baseball-cap.cyclic.app/api/uploadProduct",
          {
            data: base64,
            name: title,
            description: desc,
            category: category,
          }
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          handleClose();
          alert("Product uploaded Succesfully");
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
      console.log(title);
      console.log(base64);
      console.log("is an image");
      console.log("Show type of image: ", image.type.split("/")[1]);
    } else {
      alert("file must be image");
    }
  };

  return (
    <Container>
      <Button
        variant="contained"
        disableElevation
        style={{ marginBottom: "15.5px", marginLeft: "10px" }}
        onClick={handleClickOpen}
      >
        Add Product
      </Button>

      <Button
        variant="contained"
        disableElevation
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          marginBottom: "15.5px",
          marginLeft: "10px",
        }}
      >
        Delete Product
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "#6fa8dc" }}>
          <b>Please add the Product </b>
        </DialogTitle>
        <DialogContent>
          <Wrapper>
            {loading ? (
              <img src={loader} />
            ) : (
              <Fileupload parentCallback={handleCallback} />
            )}
            <TextField
              id="outlined-password-input"
              label="Title"
              type="text"
              style={{ marginTop: "15px", width: "100%" }}
              onChange={onHandleChange}
            />
            <TextField
              id="outlined-password-input"
              label="Description"
              type="text"
              style={{ marginTop: "15px", width: "100%" }}
              onChange={onHandleChangeDesc}
            />

            <FormControl fullWidth style={{ marginTop: "15px", width: "100%" }}>
              <InputLabel
                id="demo-simple-select-label"
                style={{ backgroundColor: "white", paddingRight: "5px" }}
              >
                Select Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChangemenu}
              >
                {optionList.map((item) => (
                  <MenuItem value={item.title}>{item.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Wrapper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleForm}>Upload</Button>
        </DialogActions>
      </Dialog>

      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection
        rowHeight={170}
        onSelectionModelChange={(data) => setDeletedRows(data)}
      />
    </Container>
  );
};

export default Products;
