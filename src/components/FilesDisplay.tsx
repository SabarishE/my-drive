import { Text, VStack, Box, Image, HStack } from "@chakra-ui/react";
import { FileInterface } from "types/type";
import { NotFound } from "components/NotFound";
import { StyledGrid } from "./Layout";

export const FilesDisplay = ({ files }: { files: FileInterface[] | null }) => {
  if (!files) {
    return <NotFound message="No files found" />;
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "application/pdf":
        return "/images/pdf.jpg";

      case "text/plain":
        return "/images/text.png";

      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return "/images/word.jpg";

      case "image/png":
      case "image/jpeg":
      case "image/gif":
        return "/images/image.png";

      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      case "application/vnd.ms-excel":
        return "/images/xl.jpg";

      case "audio/mpeg":
      case "video/mp4":
      case "video/mpeg":
      case "audio/x-m4a":
        return "/images/media.png";

      default:
        return "/images/file.png";
    }
  };

  return (
    <StyledGrid columns={[1, 2, 4, null]} spacing={4} overflow="auto" pr={2}>
      {files
        .map((file, index) => {
          return (
            <VStack
              h="225px"
              key={index}
              spacing={0}
              border="1px solid #cfcfcf"
              borderRadius="4px"
              alignItems="stretch"
              justifyContent="space-between"
            >
              <Box h="80%" pointerEvents="none" pos="relative" zIndex={0}>
                <Image
                  src="/images/checkedCover.jpg"
                  pos="absolute"
                  zIndex={10}
                  left="0"
                  top="0"
                  right="0"
                  w="100%"
                  maxH="100%"
                  opacity="0.3"
                />
                <iframe
                  src={file.dataUrl}
                  scrolling="no"
                  className="embed"
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    margin: "0 auto",
                    backgroundColor: "white",
                  }}
                />
              </Box>

              <HStack p={1} h="20%">
                <Image src={getFileIcon(file.type)} w="18px" />
                <Text noOfLines={1}>{file.name}</Text>
              </HStack>
            </VStack>
          );
        })
        .reverse()}
    </StyledGrid>
  );
};
