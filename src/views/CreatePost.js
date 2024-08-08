import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";

export default function PostPageAdd() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [tagsStr, setTags] = useState("")
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function addPost() {
    const author = user.uid;
    const tags = tagsStr.split(", ")
    await addDoc(collection(db, "posts"), { caption, image, author, title, tags });
    navigate("/");
  }




  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    console.log(user.uid);
  }, [navigate, user, loading]);

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Linkshare</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Add Post</h1>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(text) => setTitle(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              placeholder="Lovely day"
              value={caption}
              onChange={(text) => setCaption(text.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              onChange={(text) => setImage(text.target.value)}
            />
            <Form.Text className="text-muted">
              Make sure the url has a image type at the end: jpg, jpeg, png.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="caption">
            <Form.Label>Tags</Form.Label>
            <Form.Control
              type="text"
              placeholder="Put tags here"
              onChange={(text) => setTags(text.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={async (e) => addPost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
}
