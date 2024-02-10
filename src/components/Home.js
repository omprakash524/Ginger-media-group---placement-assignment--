import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
  const { logOut, user, getUserDetails } = useUserAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const details = await getUserDetails();
        setUserDetails(details);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user, getUserDetails]);

  return (
    <>
      <div className="p-4 box mt-3 text-center">
        Welcome <br />
        {user && user.email}
        {userDetails && (
          <>
            <div>Age: {userDetails.age}</div>
            <div>DOB: {userDetails.dob}</div>
            <div>Contact: {userDetails.contact}</div>
          </>
        )}
      </div>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Home;
