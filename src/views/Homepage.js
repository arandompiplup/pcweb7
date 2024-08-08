import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function PostPageHome() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  async function getAllPosts() {
    const query = await getDocs(collection(db, "posts"));
    const posts = query.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(posts);
  }

  useEffect(() => {
    getAllPosts();
  }, []);

  const ImagesRow = () => {
    return posts.map((post, index) => (
      <tr>
        <td>
        <ImageSquare key={index} post={post} />
        </td>
        <td>
          {post.caption}
        </td>
      </tr>
    ));
  };

  return (
    <>
      <Navbar variant="light" bg="light">
        <Container>
          <Navbar.Brand href="/">Linkshare</Navbar.Brand>
          <Nav>
            <Nav.Link href="/add">New Post</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <form action="/action_page.php">
          <input type="text" placeholder="Search.." name="search" />
          <button onClick={async (e) => navigate("/login")}>Submit</button>
        </form>
      </Container>
      <Container>
        <table class="table">
          <tbody>
            <ImagesRow />
          </tbody>
        </table>
      </Container>
    </>
  );
}

function ImageSquare({ post }) {
  const { id, title } = post;
  return (
    <Link to={`post/${id}`}>
      <Container
        style={{
          width: "18rem",
          marginLeft: "1rem",
          marginTop: "2rem",
        }}
      >
        {title}
      </Container>
    </Link>
  );
}
