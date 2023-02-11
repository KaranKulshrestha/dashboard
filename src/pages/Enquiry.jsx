import React, { useEffect, useState } from "react";
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
  { field: "name", headerName: "Name", width: 130 },
  { field: "phoneNumber", headerName: "Phone Number", width: 130 },
  { field: "enquery", headerName: "Enquiries", width: 11130 },
];

const fileName = "enquiries";
const exportType = "xls";

const Enquiry = () => {
  const [tableData, setTableData] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);

  const getNewsletter = async () => {
    await axios
      .get("https://mysterious-crab-baseball-cap.cyclic.app/api/getEnqueries")
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setTableData(data);
      });
  };

  const handleDelete = async () => {
    axios.post(
      "https://mysterious-crab-baseball-cap.cyclic.app/api/deleteEnquery",
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
      <Title>Enquiries</Title>
      <Button
        variant="contained"
        disableElevation
        style={{ marginBottom: "15.5px", marginLeft: "10px" }}
        onClick={() => exportToExcel(tableData, "enquiries")}
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
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={(data) => setDeletedRows(data)}
      />
    </Container>
  );
};

export default Enquiry;
