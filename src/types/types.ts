import type { DocumentReference } from 'firebase/firestore';

export type Named = {
  name: string
};

export type WithId = {
  id: string
};

export type Address = {
  country: string
  postalCode: string
  address: string
};

export type Delivery = {
  fullName: string
  deliveryService: string
  address?: Address
  items: CountableItem[]
};

export type Permission =
  | 'organization.delete'
  | 'organization.edit'
  | 'organization.member.remove'
  | 'organization.audit-log'
  | 'organization.member.invite'
  | 'inventory.create'
  | 'inventory.stockTaking'
  | 'inventory.edit'
  | 'inventory.delete'
  | 'item.edit'
  | 'item.delete'
  | 'inventory.history'
  | 'inventory.stats';

export type OrganizationRole = Named & {
  permissions: Permission[]
};

export type User = {
  firstName: string
  lastName: string
  theme: string
  language: string
  organizations: string[]
};

export type Member = User & {
  profilePictureURLOverride: string | undefined
  roles: OrganizationRole[]
};

export type UnitAttributes = {
  unit: string
};

export type Attributes<E> = {
  name: string
  values: E[]
};

export type StringAttributes = Attributes<string>;

export type NumericAttributes = Attributes<number> & UnitAttributes;

export type Item = Named & {
  unitPrice: number
  unit: string
};

export type CountableItem = Item & {
  quantity: number
  attributes: Attributes<unknown>[]
};

export type ExistingItem = CountableItem & {
  id: string
};

export enum ColumnType {
  ATTRIBUTES = 'ATTRIBUTES',
  NAME = 'NAME',
  QUANTITY = 'QUANTITY',
  UNIT = 'UNIT',
  UNIT_PRICE = 'UNIT_PRICE',
  TOTAL_PRICE = 'TOTAL_PRICE',
}

export type Inventory = Named & {
  id: string
  items: ExistingItem[]
};

export type Folder = Named & {
  id: string
  inventories: Inventory[]
  folders: Folder[]
  organizationId?: string
};

export type CountryData = {
  countryCode: string
  country: string
};

export type Organization = Named & CountryData & {
  owner: DocumentReference<User>
  members: DocumentReference[]
  roles: OrganizationRole[]
  folders: string[]
};

export type SettingsSection = Named & {
  sidebarName: string
  displayName: string
};

// Create, Update and Delete operations, and array add and remove operations.
export type HistoryType = 'create' | 'edit' | 'delete' | 'add' | 'remove';
export type HistoryObjectType = 'item' | 'inventory' | 'folder' | 'organization' | 'member';

export type AuditLogEntry = {
  type: HistoryType
  objectType: HistoryObjectType
  time: number
};

export type BlogPost = {
  id: string
  description: string
  date: Date
  title: string
};

export type RestCountriesCountryName = {
  common: string
  official: string
  nativeName: Record<string, {
    official: string
    common: string
  }>
};

export type RestCountriesCountry = {
  name: RestCountriesCountryName
  cca3: string
  independent: boolean
};
