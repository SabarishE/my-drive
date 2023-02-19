import { Box, Button, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { StorageContext } from "context/storageContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import Loader from "components/Loader";
import { ArrowBackOutline } from "@emotion-icons/evaicons-outline/ArrowBackOutline";
import { FoldersDisplay } from "components/FoldersDisplay";
import { NotFound } from "components/NotFound";
import { CreateFolderModal } from "components/CreateFolderModal";
import { Layout } from "components/Layout";
import { FilesDisplay } from "components/FilesDisplay";
import { FileUploadModal } from "components/FileUploadModal";

const FolderSelected = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFileUploadModalOpen,
    onOpen: onFileUploadModalOpen,
    onClose: onFileUploadModalClose,
  } = useDisclosure();
  const router = useRouter();

  const storageContext = useContext(StorageContext);

  if (!storageContext) {
    return null;
  }

  const { setCurrentViewingFolder, viewingFolder } = storageContext;

  if (!viewingFolder) {
    return <Loader />;
  }

  return (
    <Layout>
      <HStack justifyContent="space-between" alignItems=" center" py={4}>
        <Text fontSize={["20px", "20px"]} fontWeight="semibold" color="grey">
          {"My Drive" + " > " + viewingFolder.name}
        </Text>
        <Button
          color="#5D5CDF"
          border="1px solid #5D5CDF"
          size="sm"
          bg="none"
          _hover={{}}
          _active={{}}
          leftIcon={<ArrowBackOutline color="#5D5CDF" size="24px" />}
          onClick={() => {
            if (router.query.immediateParent) {
              setCurrentViewingFolder(router.query.immediateParent as string);
            } else {
              router.push("/");
            }
          }}
        >
          back
        </Button>
      </HStack>

      <Box>
        <HStack justifyContent="space-between" mt={[4]}>
          <Text color="#616367">Folders</Text>
          <Button
            bg="#5D5CDF"
            color="white"
            _hover={{}}
            onClick={onOpen}
            minW={["100px", "140px"]}
            size={["sm", "md"]}
          >
            Create folder
          </Button>
        </HStack>
        {viewingFolder.children?.length > 0 ? (
          <FoldersDisplay
            folders={viewingFolder.children}
            viewingFolder={viewingFolder.name}
          />
        ) : (
          <NotFound message="No folders found" />
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
        {viewingFolder.files?.length > 0 ? (
          <FilesDisplay files={viewingFolder.files} />
        ) : (
          <NotFound message="No files found" />
        )}
      </Box>
      <CreateFolderModal
        isOpen={isOpen}
        onClose={onClose}
        folderParent={viewingFolder.name}
      />
      <FileUploadModal
        isFileUploadModalOpen={isFileUploadModalOpen}
        onFileUploadModalClose={onFileUploadModalClose}
        folderName={viewingFolder.name}
      />
    </Layout>
  );
};

export default FolderSelected;
