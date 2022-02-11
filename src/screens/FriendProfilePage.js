import { useParams } from "react-router-dom";

export default function FriendProfilePage() {
    const params = useParams();
    const friend = params.friendId;
    return (
        <>
            <h1>User's friend profile page</h1>
            <h2>{friend}</h2>
        </>
    )
  }