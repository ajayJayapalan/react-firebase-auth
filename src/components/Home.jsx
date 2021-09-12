import { Button, Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { currentUser, signout } = useAuth();

  return (
    <Card
      className="p-3"
      bg="light"
      style={{ maxWidth: "500px", minWidth: "300px" }}
    >
      <h2 className="text-center text-info">Home</h2>
      <Card.Body>
        <h3 className="text-center">Hi {currentUser.displayName}</h3>
        <h5 className="text-center">{currentUser.email}</h5>
        <Button className="w-100 mt-5">Update Email</Button>
        <Button className="w-100 mt-3 btn-secondary">Change Password</Button>
        <Button onClick={signout} className="w-100 mt-3 btn-dark">
          Sign Out
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Home;
