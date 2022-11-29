import React, { useCallback, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { TextField } from "components";
import "./components/Button/styles.css";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Card from "react-bootstrap/Card";
import parse from "html-react-parser";
function App() {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState();
  const [blogs, setBlogs] = useState(JSON.parse(localStorage.getItem("blog")));
  const handelSubmitBlog = () => {
    function blobToBase64(blob) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    }
    blobToBase64(file).then(res=>{
      const data = {
        file:res,
        title,
        description,
        tags,
      };
      const lcBlogs = JSON.parse(localStorage.getItem("blog"));
      localStorage.setItem(
        "blog",
        JSON.stringify(lcBlogs?.length > 0 ? [...lcBlogs, data] : [data])
      );

    }) 
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Container>
      <div className="bg-light shadow text-center">
        <Form className="p-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Enter Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <div className="Editor">
            <CKEditor
              editor={ClassicEditor}
              data="Hello from CKEditor 5!"
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>
          <br />
        </Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="key words"
            onChange={(e) => setTags(e.target.value)}
          />
        </Form.Group>
      </div>
      <div className="bg-info d-flex p-2 rounded-2" {...getRootProps()}>
        {file?.name ? file.name : "upload your Article Thumbnail"}
        <input {...getInputProps()} />
      </div>
      <Button className="w-100" onClick={handelSubmitBlog}>
        submit
      </Button>
      <Row className={'mt-4 rounded-3 bg-dark container'}>
        {blogs?.map((blog) => (
          <Col className="p-3" md={4}>
            <Card  className="h-100 p-3 bg-info">
              <Card.Img src={blog.file} />
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                  <Card.Text className={'w-100'}>{parse(blog.description || '')}</Card.Text>
                <Badge variant="danger">
                  {blog.tags}
                </Badge>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
XMLHttpRequestUpload()
}

export default App;
