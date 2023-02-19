import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  VStack,
} from "@chakra-ui/react";
import { StorageContext } from "context/storageContext";
import { ChangeEvent, useContext, useRef, useState } from "react";

export const FileUploadModal = ({
  isFileUploadModalOpen,
  onFileUploadModalClose,
  folderName,
}: {
  isFileUploadModalOpen: boolean;
  onFileUploadModalClose: () => void;
  folderName?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const storageContext = useContext(StorageContext);

  if (!storageContext) {
    return null;
  }

  const { uploadFile } = storageContext;

  const browseImage = () => {
    return (
      <label
        style={{
          fontSize: "md",
          fontWeight: "semibold",
          lineHeight: "24px",
          color: "#0070D2",
        }}
      >
        Browse
        <input
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </label>
    );
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      uploadFile(
        {
          name: e.target.files ? e.target.files[0].name : "un named file",
          type: e.target.files ? e.target.files[0].type : "",

          dataUrl: `${reader.result}`,
        },
        folderName ? folderName : ""
      );
      onFileUploadModalClose();
    };
  };

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };
  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      let fileName = e.dataTransfer.files[0].name;
      let fileType = e.dataTransfer.files[0].type;

      const reader = new FileReader();

      reader.readAsDataURL(e.dataTransfer.files[0]);

      reader.onload = () => {
        uploadFile(
          {
            name: fileName,
            type: fileType,
            dataUrl: `${reader.result}`,
          },
          folderName ? folderName : ""
        );
        onFileUploadModalClose();
      };

      e.dataTransfer.clearData();
    }
  };

  return (
    <Modal
      isOpen={isFileUploadModalOpen}
      onClose={onFileUploadModalClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent pb={10}>
        <ModalHeader>Upload file</ModalHeader>
        <ModalCloseButton _hover={{}} />

        <ModalBody>
          <Box
            borderRadius="10px"
            h="100px"
            border={isDragging ? "2px solid #5D5CDF" : "2px dashed #9FB1BD"}
            onDrop={handleDrop}
            onDragLeave={handleDragOut}
            onDragEnter={handleDragIn}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onClick={() => {
              inputRef?.current?.click();
            }}
            px={4}
          >
            <VStack
              pointerEvents="none"
              h="100%"
              spacing={1}
              justifyContent="center"
            >
              <Text
                fontSize="md"
                fontWeight="semibold"
                lineHeight="24px"
                color="#3E5463"
              >
                Drag and Drop your image or {browseImage()}
              </Text>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
