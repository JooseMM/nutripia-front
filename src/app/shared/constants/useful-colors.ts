export interface Color {
  color: string;
  background: string;
}

export const softRed: Color = {
  color: '#673e59',
  background: '#ffc7e9',
} as const;

export const softPurple: Color = {
  color: '#4b3c67',
  background: '#d7c3f7',
} as const;

export const softYellow: Color = {
  color: '#67563c',
  background: '#f7edd7',
} as const;

export const softGreen: Color = {
  background:"#dcfce7",
  color: "#15803d",
} as const;

export const softGray: Color = {
  background:"#dfe3e7",
  color: "#777b7f",
} as const;
