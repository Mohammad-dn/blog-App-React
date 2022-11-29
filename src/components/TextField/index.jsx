import Editor from "components/Editor";
import React from "react";
import Form from "react-bootstrap/Form";
export function TextField() {
  return (
    <div className="bg-dark
    text-center
    ">
    <Form className="py-4">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter Title" />
      </Form.Group>
      <Editor />
    </Form>
    </div>
  );
}
