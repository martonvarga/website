export type WorkbookOrderFormType = {
  firstName: string;
  lastName: string;
  email: string;
  zip: string;
  city: string;
  address: string;
};

export const defaultWorkbookOrderFormValues: WorkbookOrderFormType = {
  firstName: "",
  lastName: "",
  email: "",
  zip: "",
  city: "",
  address: "",
};
