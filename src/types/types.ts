export type Named = {
  name: string;
};

export type Address = {
  country: string;
  postalCode: string;
  address: string;
};

export type Delivery = {
  fullName: string;
  deliveryService: string;
  address?: Address;
  items: CountableItem[];
};

export type Permission = Named;

export type OrganizationRole = Named & {
  permissions: Permission[];
};

export type User = {
  firstName: string;
  lastName: string;
};

export type Member = User & {
  theme: string;
  profilePictureURL: string;
  organizationLanguage: string;
  roles: OrganizationRole[];
};

export type UnitAttributes = {
  unit: string;
};

export type Attributes<E> = {
  name: string;
  values: E[];
};

export type StringAttributes = Attributes<string>;

export type NumericAttributes = Attributes<number> & UnitAttributes;

export type CountableItem = Item & {
  id: string;
  quantity: number;
  attributes: Attributes<any>[];
};

export type Item = Named & {
  id: string;
  unitPrice: number;
  unit: string;
};

export type Column = Named & {
  itemPropertyName?: string;
}

export enum ColumnType {
  ATTRIBUTES = 'ATTRIBUTES',
  NAME = 'NAME',
  QUANTITY = 'QUANTITY',
  UNIT = 'UNIT',
  UNIT_PRICE = 'UNIT_PRICE',
  TOTAL_PRICE = 'TOTAL_PRICE'
}


export type ComputedColumn = Column & {
  compute: (item: CountableItem) => any;
}

export type Inventory = Named & {
  items: CountableItem[];
  columns?: Column[];
};

export type Folder = Named & {
  inventories: Inventory[];
  folders: Folder[];
  organizationId?: string;
};

export type Organization = Named & {
  country: string;
  currencyFormat: string;
  percentageFormat: string;
  members: Member[];
  roles: OrganizationRole[];
  folders: Folder[];
  addresses?: Address[];
};
