export enum MarkedTextElements {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  small = "small",
  subtitle = "subtitle",
}

export interface IMarkedText {
  text: string;
  element: MarkedTextElements;
}
