declare module 'astronomia' {
  export const julian: {
    DateToJD(date: Date): number;
  };
  export const moonposition: {
    position(jd: number): { lon: number; lat: number; range: number };
  };
}
