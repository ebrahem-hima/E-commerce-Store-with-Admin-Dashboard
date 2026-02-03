export interface tableType {
  dataBody: tableBodyType;
  titles: { title: string }[];
  role?: "user" | "admin";
  empty_table: string;
}
