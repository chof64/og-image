export type FileType = "png" | "jpeg";
export type Theme = "light" | "dark";

export interface ParsedRequest {
  fileType: FileType;
  header: string;
  subheader: string;
  theme: Theme;
}
