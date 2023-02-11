import React, {useState} from 'react'
import styled from "styled-components"

const Container = styled.div`
    width: 20vw;
    height: 10vh;
    border: 2px dotted gray;
    background-color: #f2f2f2;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Input = styled.input`
    position: absolute;
    margin-left:45%;
    opacity: 0;
`

const Button = styled.button`
    cursor: pointer;
    justify-content: center;
    padding: 10px;
    background-color: #e67338;
    border: none;
    border-radius: 4px;
    color: white;
`

const Fileupload = (props) => {
    const [image, setImage] = useState('');

    const uploadHandler = (e) => {
        e.preventDefault();
        setImage(e.target.files[0]);
        props.parentCallback(e.target.files[0]);
    };


  return (
    <Container>
        <Input type="file" onChange={uploadHandler} />
        <Button>Upload Image</Button>
    </Container>
  )
}

export default Fileupload;