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
  {
    field: "Featued Image",
    headerName: "Featured Image",
    width: 350,
    renderCell: (params) => {
      return (
        <Wrapper>
          <img src={params.row.image} style={{ width: "100%" }} />
        </Wrapper>
      );
    },
  },
  { field: "title", headerName: "Category Name", width: 230 },
];

const Category = () => {
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [deletedRows, setDeletedRows] = useState([]);

  const getProduct = async () => {
    axios.get("https://mysterious-crab-baseball-cap.cyclic.app/api/getCategory").then((res) => {
      const data = res.data.data;
      setTableData(data);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

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
    axios.post("https://mysterious-crab-baseball-cap.cyclic.app/api/deleteCategory", {
      data: deletedRows,
    });
    alert("successfully deleted");
    window.location.reload(false);
    console.log(deletedRows);
  };

  const handleForm = async () => {
    if (image.type.match("image.*")) {
      const base64 = await convertBase64(image);
      setLoading(true);
      axios
        .post("https://mysterious-crab-baseball-cap.cyclic.app/api/uploadCategory", {
          data: base64,
          title: title,
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
          handleClose();
          alert("Category uploaded Succesfully");
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
        Add Category
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
        DELETE Category
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style={{ color: "#6fa8dc" }}>
          <b>Please add the Product Category</b>
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

export default Category;
