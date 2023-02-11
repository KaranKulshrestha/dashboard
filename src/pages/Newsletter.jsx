import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styled from "styled-components";
import { exportToExcel } from "react-json-to-excel";
import Button from "@mui/material/Button";
import axios from "axios";

const Container = styled.div`
  width: 83vw;
`;

const Title = styled.h2`
  color: #205295;
  font-size: 40px;
  margin-left: 10px;
  margin-bottom: 5px;
`;

const columns = [
  { field: "id", headerName: "ID", width: 270 },
  { field: "email", headerName: "Email", width: 730 },
];

const fileName = "newsletters";
const exportType = "xls";

const Newsletter = () => {
  const [tableData, setTableData] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  const getNewsletter = async () => {
    axios
      .get("https://mysterious-crab-baseball-cap.cyclic.app/api/getNewsletter")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setTableData(data);
      });
  };

  const handleDelete = async () => {
    axios.post(
      "https://mysterious-crab-baseball-cap.cyclic.app/api/deleteNewsletter",
      {
        data: deletedRows,
      }
    );
    alert("successfully deleted");
    window.location.reload(false);
    console.log(deletedRows);
  };

  useEffect(() => {
    getNewsletter();
  }, []);

  return (
    <Container>
      <Title>Newsletter</Title>
      <Button
        variant="contained"
        disableElevation
        style={{ marginBottom: "15.5px", marginLeft: "10px" }}
        onClick={() => exportToExcel(tableData, "newsletters")}
      >
        Export Data
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
        DELETE Newsletter
      </Button>

      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(data) => setDeletedRows(data)}
      />
    </Container>
  );
};

export default Newsletter;
