export type TSuppliersId = string[];

export type TCategoryData = {
  id: number,
  subjectId: number,
  subjectParentId: number,
  name: string,
  brand: string,
  brandId: number,
  siteBrandId: number,
  supplierId: number,
  sale: number,
  priceU: number,
  salePriceU: number,
  rating: number,
  feedbacks: number,
  colors: { name:string }[],
};

export type TPhotos = { [key: string]: string };

export type TFullDataCategory = TCategoryData & {
  photo: string,
  date: string,
  amount: number,
};
