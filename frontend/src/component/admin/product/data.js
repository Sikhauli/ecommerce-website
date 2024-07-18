
const columns = [
  { name: "Id", uid: "id", sortable: false },
  { uid: "brand", name: "Brand" },
  { uid: "title", name: "Title" },
  { uid: "description", name: "Description" },
  { uid: "category", name: "Category" },
  { uid: "price", name: "Price" },
  { uid: "actions", name: "Actions" },
];


const statusOptions = [
    { name: "Read", uid: "read" },
    { name: "Later", uid: "later" },
    { name: "None", uid: "" },
];


export { columns, statusOptions };
