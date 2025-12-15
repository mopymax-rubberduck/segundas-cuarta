export interface Contact {
  id?: string;
  name: string;
  phone: string;
  email: string;
  note: string;
  createdAt?: Date;
}

export type RootStackParamList = {
  List: undefined;
  Edit: { id: string };
};
