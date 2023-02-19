export interface FolderInterface {
  name: string;
  files: FileInterface[];
  children: FolderInterface[];
}

export interface FileInterface {
  name: string;
  type: string;
  dataUrl: string;
}

export interface FileObjectInterface {
  lastModified: number;
  lastModifiedDate?: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
