import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { FileInterface, FolderInterface } from "types/type";

export interface StorageInterface {
  storage: FolderInterface[] | null;
  createFolder: (folderName: string, parentName?: string) => void;
  getCurrentFolder: (folderName: string) => FolderInterface | null;
  uploadFile: (file: FileInterface, folderName: string) => void;
  setCurrentViewingFolder: (
    folderName: string,
    immediateParent?: string
  ) => void;
  viewingFolder: FolderInterface | null;
  files: FileInterface[] | null;
}

export const StorageContext = createContext<StorageInterface | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [storage, setStorage] = useState<FolderInterface[] | null>(null);
  const [viewingFolder, setViewingFolder] = useState<FolderInterface | null>(
    null
  );
  const [files, setFiles] = useState<FileInterface[] | null>(null);

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    checkMyStorage();
    checkViewingFolder();
    checkMyFiles();
  }, []);

  // Creating a folder

  const createFolder = async (folderName: string, parentName?: string) => {
    if (storage) {
      if (parentName) {
        const addFolder = (currentStorage: FolderInterface[]) => {
          currentStorage.forEach((folder) => {
            if (folder.name === parentName) {
              folder.children.push({
                name: folderName,
                files: [],
                children: [],
              });

              updateCurrentViewingFolder(folder);
              return;
            }
            if (folder.children.length > 0) {
              addFolder(folder.children);
            }
          });
        };
        addFolder(storage as FolderInterface[]);
      } else {
        storage.push({ name: folderName, files: [], children: [] });
      }
      localStorage.setItem("mystorage", JSON.stringify(storage));
      toast({
        title: "Folder created successfully !",
        status: "success",
      });
    } else {
      localStorage.setItem(
        "mystorage",
        JSON.stringify([{ name: folderName, files: [], children: [] }])
      );
      toast({
        title: "Folder created successfully !",
        status: "success",
      });
    }
    checkMyStorage();
  };

  // Getting current folder

  const getCurrentFolder = (folderName: string) => {
    let currentFolder = {} as FolderInterface;

    const findCurrentFolder = (currentStorage: FolderInterface[]) => {
      currentStorage.forEach((folder) => {
        if (folder.name === folderName) {
          router.push(`/folders/${folder.name}`);
          currentFolder = { ...folder };
          return;
        }
        if (folder.children.length > 0) {
          findCurrentFolder(folder.children);
        }
      });
    };
    if (storage) {
      findCurrentFolder(storage as FolderInterface[]);
    } else {
      toast({ title: "Folder not found !", status: "error" });
      return null;
    }

    if (currentFolder) {
      router.push(`/folders/${currentFolder.name}`);
      return currentFolder;
    } else {
      toast({ title: "Folder not found !", status: "error" });
      return null;
    }
  };

  // Setting current viewing folder in local storage

  const setCurrentViewingFolder = (
    folderName: string,
    immediateParent?: string
  ) => {
    const curretFolder = getCurrentFolder(folderName);
    updateCurrentViewingFolder(curretFolder as FolderInterface);

    if (immediateParent) {
      router.push(`/folders/${folderName}?immediateParent=${immediateParent}`);
    } else {
      router.push(`/folders/${folderName}`);
    }
  };

  // Updating current viewing folder

  const updateCurrentViewingFolder = (folder: FolderInterface) => {
    localStorage.setItem("currentViewingFolder", JSON.stringify(folder));
    setViewingFolder(folder);
  };

  // Uploading file

  const uploadFile = (file: FileInterface, folderName?: string) => {
    const addFile = (currentStorage: FolderInterface[]) => {
      if (folderName) {
        currentStorage.forEach((folder) => {
          if (folder.name === folderName) {
            folder.files.push(file);
            updateCurrentViewingFolder(folder);
            updateMyFiles(file);
            toast({ title: "File uploaded successfully !", status: "success" });
            return;
          }
          if (folder.children.length > 0) {
            addFile(folder.children);
          }
        });
      } else {
        updateMyFiles(file);
        toast({ title: "File uploaded successfully !", status: "success" });
      }
    };
    addFile(storage as FolderInterface[]);

    localStorage.setItem("mystorage", JSON.stringify(storage));
    setStorage(storage);
  };

  // Updates files in local storage

  const updateMyFiles = (file: FileInterface) => {
    if (files) {
      files.push(file);
      localStorage.setItem("myfiles", JSON.stringify(files));
      setFiles(files);
    } else {
      localStorage.setItem("myfiles", JSON.stringify([{ ...file }]));
      setFiles([file]);
    }
  };

  // Check viewing volder

  const checkViewingFolder = () => {
    const currentViewingFolder = localStorage.getItem("currentViewingFolder");

    if (currentViewingFolder) {
      setViewingFolder(JSON.parse(currentViewingFolder));
    } else {
      setViewingFolder(null);
    }
  };

  // Check my files in local storage

  const checkMyFiles = () => {
    const storageFiles = localStorage.getItem("myfiles") as string;

    if (storageFiles) {
      setFiles(JSON.parse(storageFiles));
    } else {
      setFiles(null);
    }
  };

  //   Check my storage in local storage

  const checkMyStorage = () => {
    const storageFolders = localStorage.getItem("mystorage") as string;

    if (storageFolders) {
      setStorage(JSON.parse(storageFolders));
    } else {
      setStorage(null);
    }
  };

  return (
    <StorageContext.Provider
      value={{
        storage,
        createFolder,
        getCurrentFolder,
        uploadFile,
        setCurrentViewingFolder,
        viewingFolder,
        files,
      }}
    >
      {children}
    </StorageContext.Provider>
  );
};
