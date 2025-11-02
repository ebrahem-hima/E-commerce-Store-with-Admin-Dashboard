// export type tableBodyType = TopMemberType[];
export type tableBodyType = TopProductType[] | TopMemberType[];

export interface tableType {
  dataBody: tableBodyType;
  titles: { title: string }[];
}

// export interface titleTable {
//   [key]: string;
// }
