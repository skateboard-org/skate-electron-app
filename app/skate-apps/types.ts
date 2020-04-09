export enum TypesName {
  Text = 'Text',
  ListOfImages = 'ListOfImages',
  ListOfGifs = 'ListOfGifs',
  ListOfLinks = 'ListOfLinks',
  ListOfText = 'ListOfText'
}

export interface ErrorType {
  success: boolean;
  type: string;
  error: string;
}

export interface ListOfImages {
  data: [string];
  success: boolean;
}

export interface ListOfGifs {
  data: [string];
  success: boolean;
}
export interface ListOfLinks {
  data: [string];
  success: boolean;
}

export interface ListOfText {
  data: [string];
  success: boolean;
}

export interface Text {
  data: string;
  success: boolean;
}

export interface Command {
  success: boolean;
  type: string;
}

export interface Response {
  success: boolean;
  data: ListOfImages | ListOfGifs | ListOfLinks | Text | Command | undefined;
  error: Error;
}
