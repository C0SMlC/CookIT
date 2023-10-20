import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Input,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Card,
  Button,
  Heading,
  CardBody,
} from "@chakra-ui/react";

import { LockIcon, EmailIcon } from "@chakra-ui/icons";

import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const axiosInstance = axios.create({
        baseURL: "http://localhost:3000",
        withCredentials: true,
      });

      const res = await axiosInstance.post("/users/login", {
        email,
        password,
      });

      console.log(res);

      if (res.data.status === "success") {
        navigate("/app");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <Card maxW="lg" mx="auto" mt="10rem" p="5">
      <CardBody>
        <form onSubmit={handleLogin}>
          <Heading
            as="h3"
            size="xl"
            noOfLines={3}
            mb={"4rem"}
            textAlign={"center"}
          >
            Log In
          </Heading>
          {error && <div className="error-message">{error}</div>}
          <Stack spacing={12}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Phone number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
            <InputGroup size="md">
              <InputLeftElement pointerEvents="none">
                <LockIcon color="gray.300" />
              </InputLeftElement>
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                required
                minLength="8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" colorScheme="teal" size="lg">
              Login
            </Button>
          </Stack>
        </form>
      </CardBody>
    </Card>
  );
};

export default Login;
