import { faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { ChangeEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EyeFilledIcon } from "../../components/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../components/icons/EyeSlashFilledIcon";
import { UserModel } from "../../models";
import { uploadPhoto } from "../../services/file-service";
import { registerUser } from "../../services/user-service";
import avatarLogo from "../../assets/avatar.jpeg";

export default function SignUpModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [imgSrc, setImgSrc] = useState<File>();

  const toggleVisibility = () => setIsVisible(!isVisible);
  const isInvalid =
    username === "" ||
    firstName === "" ||
    lastName === "" ||
    email === "" ||
    password === "" ||
    secondPassword === "" ||
    !imgSrc;

  const isPassInvalid =
    password !== secondPassword && (password !== "" || secondPassword !== "");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  //   const emailInputRef = useRef<HTMLInputElement>(null)
  //   const passwordInputRef = useRef<HTMLInputElement>(null)
  const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImgSrc(e.target.files[0]);
    }
  };
  const selectImg = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const imgUrl = imgSrc ? await uploadPhoto(imgSrc!) : "";
    const user: UserModel = {
      email,
      username,
      password,
      firstName,
      lastName,
      imgUrl,
    };
    const registeredUser = await registerUser(user);
    if (registeredUser && !isInvalid) {
      console.log("shit");
      localStorage.setItem("currentUser", JSON.stringify(registeredUser));
      navigate("/home");
    }
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Join
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Join us 🎉
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center position-relative">
                  <img
                    src={imgSrc ? URL.createObjectURL(imgSrc) : avatarLogo}
                    className="h-24 w-24 rounded-full border border-foreground-300"
                  />
                  <button
                    type="button"
                    className="btn position-absolute bottom-0 end-0 pl-20"
                    onClick={selectImg}
                  >
                    <FontAwesomeIcon
                      icon={faImage}
                      className="fa-xl text-default"
                    />
                  </button>
                </div>

                <input
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  type="file"
                  onChange={imgSelected}
                ></input>
                <Input
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  isRequired
                  value={email}
                  onValueChange={setEmail}
                />
                <Input
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                  isRequired
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  type="text"
                  label="First Name"
                  placeholder="Enter your first name"
                  isRequired
                  value={firstName}
                  onValueChange={setFirstName}
                />
                <Input
                  type="text"
                  label="Last Name"
                  placeholder="Enter your last name"
                  isRequired
                  value={lastName}
                  onValueChange={setLastName}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  isRequired
                  endContent={
                    <button
                      className="focus:outline-none"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {isVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                />
                <Input
                  label="Password"
                  placeholder="Enter matching password"
                  isRequired
                  type="password"
                  //   className="max-w-xs"
                  isInvalid={isPassInvalid}
                  errorMessage={
                    isPassInvalid && "Please enter a matching password"
                  }
                  value={secondPassword}
                  onValueChange={setSecondPassword}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit}
                  isDisabled={isInvalid || isPassInvalid}
                >
                  Join in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
