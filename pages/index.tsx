import { Button, HStack, Text, useDisclosure, Box } from "@chakra-ui/react";
import { StorageContext } from "context/storageContext";
import { useContext } from "react";
import { FoldersDisplay } from "components/FoldersDisplay";
import { NotFound } from "components/NotFound";
import { CreateFolderModal } from "components/CreateFolderModal";
import { Layout } from "components/Layout";
import { FilesDisplay } from "components/FilesDisplay";
import { FileUploadModal } from "components/FileUploadModal";

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFileUploadModalOpen,
    onOpen: onFileUploadModalOpen,
    onClose: onFileUploadModalClose,
  } = useDisclosure();

  const storageContext = useContext(StorageContext);

  if (!storageContext) {
    return null;
  }

  const { storage, files } = storageContext;

  return (
    <>
      <Layout>
        <Box>
          <HStack justifyContent="space-between" my={[4, 6]}>
            <Text color="#616367">Folders</Text>
            <Button
              bg="#5D5CDF"
              color="white"
              minW={["100px", "140px"]}
              size={["sm", "md"]}
              _hover={{}}
              onClick={onOpen}
            >
              Create folder
            </Button>
          </HStack>
          {!storage ? (
            <NotFound message="No folders found" />
          ) : (
            <FoldersDisplay folders={storage} />
          )}
        </Box>
        <Box>
          <HStack justifyContent="space-between" my={[4, 6]}>
            <Text color="#616367">Files</Text>
            <Button
              bg="#5D5CDF"
              color="white"
              _hover={{}}
              onClick={onFileUploadModalOpen}
              minW={["100px", "140px"]}
              size={["sm", "md"]}
            >
              Upload file
            </Button>
          </HStack>

          {files?.length === 0 ? (
            <NotFound message="No files found" />
          ) : (
            <FilesDisplay files={files} />
          )}
        </Box>
        <CreateFolderModal isOpen={isOpen} onClose={onClose} />
        <FileUploadModal
          isFileUploadModalOpen={isFileUploadModalOpen}
          onFileUploadModalClose={onFileUploadModalClose}
        />
      </Layout>
    </>
  );
};

export default Home;
