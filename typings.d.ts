interface Person {
  slNo?: number;
  actions?: any;
  name: string | null;
  age: number;
  city: string;
  pinCode: string | null;
  [key: string]: string | number;
}

type TModalInputs = {
  isDeleteBtnClicked: boolean;
  isEditBtnClicked: boolean;
  rowData: Person | null;
  rowNumber: number | null;
  edditedName: string;
  edditedAge: number;
  edditedCity: string;
  edditedPinCode: string;
};
