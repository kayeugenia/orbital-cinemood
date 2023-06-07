import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import logo from '../images/logo.svg';

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordRef.current?.value || !confirmPasswordRef.current?.value) {
      setErrorMsg("Please fill all the fields");
      return;
    }
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setErrorMsg("Passwords doesn't match. Try again");
      return;
    }
    try {
      setErrorMsg("");
      setLoading(true);
      const { data, error } = await updatePassword(passwordRef.current.value);
      if (!error) {
        navigate("/");
      }
    } catch (error) {
      setErrorMsg("Error in Updating Password. Please try again");
    }
    setLoading(false);
  };

  return (
    <Container
            maxWidth="xs"
            display="flex"
            justifyContent="sssscenter"
            alignItems="center"
            minHeight="100vh"
            >
            <Box
            sx={{
                border: '2px solid #ffffff',
                borderRadius: '15px',
                padding: '18px', 
                backgroundColor: 'white',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            }}
            >
    <img src={logo} alt="Logo" height="100"/>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confirm-password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            {errorMsg && (
              <Alert
                variant="danger"
                onClose={() => setErrorMsg("")}
                dismissible>
                {errorMsg}
              </Alert>
            )}
            <div className="text-center mt-2">
              <Button disabled={loading} type="submit" className="w-50">
                Update
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Box>
    </Container>
  );
};

export default UpdatePassword;