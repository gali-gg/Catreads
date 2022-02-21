import { Container } from "@mui/material";
import { PostsLayout } from "../assets/components/PostsLayout";

export default function ProfilePage() {
    return (
      <>
        <h1>Users profile page</h1>
        <Container >
          <PostsLayout style={{paddingLeft:"10px"}}></PostsLayout>
        </Container>
      </>
      
    )
  }