export enum ResponseTypes {
  ListOfImages = 'ListOfImages',
  ListOfGifs = 'ListOfGifs',
  ListOfLinks = 'ListOfLinks',
  ListOfText = 'ListOfText',
  Command = 'Command'
}

// GIF

export interface ListOfGifsResponseType {
  data: [GifItemType];
  success: boolean;
}

export interface GifItemType {
  src: string;
  width: number;
  height: number;
}

// IMAGES

export interface ListOfImagesResponseType {
  data: [ImageItemType];
  success: boolean;
}

export interface ImageItemType {
  src: string;
  width: number;
  height: number;
}

// LINKS
export interface LinkItemType {
  link: string;
  title: string;
}

export interface ListOfLinksResponseType {
  data: [LinkItemType];
  success: boolean;
}

// TEXT

export interface TextItemType {
  text: string;
}

export interface ListOfTextResponseType {
  data: [TextItemType];
  success: boolean;
}

export interface TextResponseType {
  data: TextItemType;
  success: boolean;
}

// COMMAND
export interface CommandResponseType {
  success: boolean;
}

// ERROR

export interface ErrorType {
  success: boolean;
  error: string;
}

export type Response =
  | CommandResponseType
  | TextResponseType
  | ListOfGifsResponseType
  | ListOfImagesResponseType
  | ListOfLinksResponseType;
