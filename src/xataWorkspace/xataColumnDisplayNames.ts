import { Column } from "./xataWorkspaceSchemas";

export const xataColumnDisplayNames: Record<Column["type"], string> = {
  bool: "Boolean",
  datetime: "Date",
  email: "Email",
  float: "Decimal number",
  int: "Integer number",
  multiple: "Multiple select",
  string: "String",
  text: "Long text",
  link: "Link",
  object: "Object",
};
