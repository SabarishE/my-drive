import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";
import { StorageContext } from "context/storageContext";
import { FormEvent, useContext, useState } from "react";

export const CreateFolderModal = ({
  isOpen,
  onClose,
  folderParent,
}: {
  isOpen: boolean;
  onClose: () => void;
  folderParent?: string;
}) => {
  const storageContext = useContext(StorageContext);
  const [folderName, setFolderName] = useState("");

  if (!storageContext) {
    return null;
  }

  const { createFolder } = storageContext;
  const toast = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (folderName.length > 12) {
      toast({ title: "Maximum allowed characters is 12", status: "warning" });
      return;
    }

    createFolder(folderName, folderParent);
    onClose();

    setFolderName("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new folder</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              type="text"
              placeholder="enter folder name"
              _focus={{ outline: "none" }}
              _active={{}}
              outline="none"
              value={folderName}
              onChange={(e) => {
                setFolderName(e.target.value);
              }}
              border="1px solid grey"
              isRequired={true}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#5D5CDF"
              color="white"
              type="submit"
              _hover={{}}
              _active={{}}
            >
              Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};
