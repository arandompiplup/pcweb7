import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  Col,
  Container,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { deleteDoc, doc, getDoc } from "firebase/firestore";

export default function PostPageDetails() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const params = useParams();
  const id = params.id;
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function deletePost(id) {
    // checkPost(id)
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    console.log(postDocument.data());
    if (post.author !== user.uid) {
      alert("401 unauthorised, not your post dont anyhow edit");
      navigate(`/post/${id}`);
      return;
    }
    await deleteDoc(doc(db, "posts", id));
    navigate("/");
  }

  async function getPost(id) {
    const postDocument = await getDoc(doc(db, "posts", id));
    const post = postDocument.data();
    setCaption(post.caption);
    setImage(post.image);
    setTitle(post.title);
    setTags(post.tags);
    console.log(post.tags);
  }


  const TagsRow = () => {
    if (tags) {
      const tagsPrint = tags;
      var tagsList = tagsPrint[0];
      for (let i = 1; i < tagsPrint.length; i++) {
        tagsList = tagsList + ", " + tagsPrint[i];
      }
      return <CardText>{tagsList}</CardText>;
    } else {
      return;
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/login");
    getPost(id);
  }, [id, navigate, user, loading]);

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
        <Row style={{ marginTop: "2rem" }}>
          <Col md="6">
            <a href={image}>content</a>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>{title}</Card.Text>
                <Card.Text>{caption}</Card.Text>
                <TagsRow />
                <Card.Link href={`/edit/${id}`}>Edit</Card.Link>
                <Card.Link
                  onClick={() => deletePost(id)}
                  style={{ cursor: "pointer" }}
                >
                  Delete
                </Card.Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
