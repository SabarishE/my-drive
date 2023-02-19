import { HStack, Text } from "@chakra-ui/react";
import { Folder } from "@emotion-icons/boxicons-solid/Folder";
import { StorageContext } from "context/storageContext";
import { useContext, useState } from "react";
import { FolderInterface } from "types/type";
import { StyledGrid } from "./Layout";

export const FoldersDisplay = ({
  folders,
  viewingFolder,
}: {
  folders: FolderInterface[];
  viewingFolder?: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const storageContext = useContext(StorageContext);

  if (!storageContext) {
    return null;
  }

  const { setCurrentViewingFolder, uploadFile } = storageContext;

  const handleDragIn = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setCurrentIndex(index);
    }
  };
  const handleDragOut = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(null);
  };
  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    folderName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

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
        setCurrentIndex(null);
      };

      e.dataTransfer.clearData();
    }
  };

  return (
    <>
      <StyledGrid
        columns={[1, 2, 4, null]}
        mt={[2, 4]}
        maxHeight="200px"
        overflow="auto"
        pr={2}
        spacing={4}
      >
        {folders.map((folder, index) => {
          const isDropZone = index === currentIndex;

          return (
            <HStack
              key={index}
              h="60px"
              p={4}
              spacing={4}
              border={isDropZone ? "1px solid #5D5CDF" : "1px solid #cfcfcf"}
              alignItems="center"
              borderRadius="4px"
              onDoubleClick={() => {
                setCurrentViewingFolder(folder.name, viewingFolder);
              }}
              cursor="pointer"
              transition="0.3s"
              onDrop={(e) => {
                if (isDropZone) handleDrop(e, folder.name);
              }}
              onDragLeave={handleDragOut}
              onDragEnter={(e) => handleDragIn(e, index)}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Folder size="24px" color="#616367" />
              <Text color="#616367">{folder.name}</Text>
            </HStack>
          );
        })}
      </StyledGrid>
    </>
  );
};
