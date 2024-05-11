export type loggedInUserProps = {
  id: number;
  role: string;
  name: string;
  userName: string;
  password: string;
}

export type dependentProps = {
  id: string;
  name: string;
  dob: string;
  relation: string;
}

export type LeftDrawerProps = {
  children: JSX.Element[] | JSX.Element;
  open: boolean;
  setOpen: (value: boolean) => void;
}

export type InfoCardPorps = {
  userId?: number;
  depId?: string;
  name: string;
  dob?: string;
  empCode?: string;
  relation: string;
  roleType?: boolean;
  keepButton?: boolean;
  selectedEmployee?: number;
  handleEdit?: any;
  handleDelete?: any;
  setSelectedEmployee?: (employeeId: number) => void;
};

export type EmployeeListProps = {
  id?: number;
  name: string;
  userName: string;
  role: string;
  company_id: string;
  designation: string;
  doj: string;
  dob?: string;
  gender: string;
  dependents: dependentProps[];
};