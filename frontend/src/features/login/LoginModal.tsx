import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, loginUser } from "../../services/user-service";

export default function SignInModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const userToLogin = { username, password };
    const res = await loginUser(userToLogin);

    if (res) {
      const user = await getCurrentUser(res.accessToken);

      if (user) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ ...user, ...res })
        );
        navigate("/home");
      }
    }
  };

  return (
    <>
      <Button color="primary" variant="bordered" onPress={onOpen}>
        Sign In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  isRequired
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  isRequired
                  type="password"
                  value={password}
                  onValueChange={setPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSignIn}>
                  Sign In
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
