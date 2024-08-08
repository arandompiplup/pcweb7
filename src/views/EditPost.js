import React, { useEffect, useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {useAuthState} from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export default function PostPageUpdate() {
  const params = useParams();
  const id = params.id;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [user, loading] = useAuthState(auth);
  const [tagsStr, setTags] = useState("")
  const navigate= useNavigate();

 

  async function updatePost() {
    const tags = tagsStr.split(", ")
    await updateDoc(doc(db, "posts", id), { caption, image, title, tags });
    navigate(`/post/${id}`)
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    if (post.author !== user.uid) {
        alert("401 unauthorised, not your post dont anyhow edit")
        navigate("/")
    }
      if (post.tags) {
          const tagsPrint = post.tags
          var tagsList = tagsPrint[0]
          for (let i=1; i < tagsPrint.length; i++) {
              tagsList = tagsList + ", " + tagsPrint[i];
          };}

    setCaption(post.caption);
    setImage(post.image);
    setTitle(post.title);
    setTags(tagsList)
    console.log(tagsList)
  }

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);




 

  return (
    <div>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Tinkergram</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
            <Nav.Link onClick={(e) => signOut(auth)}>🚪</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <h1 style={{ marginBlock: "1rem" }}>Update Post</h1>
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
            <Form.Label>Content URL</Form.Label>
            <Form.Control
              type="text"
              value={image}
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
              value={tagsStr}
              onChange={(text) => setTags(text.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={async (e) => updatePost()}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
  }