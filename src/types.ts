import type { DocumentReference } from 'firebase/firestore';

export type Named = {
  name: string
};

export type WithId = {
  readonly id: string
};

export const ALL_PERMISSIONS = [
  'organization.delete',
  'organization.edit',
  'organization.roles.view',
  'organization.roles.create',
  'organization.roles.delete',
  'organization.roles.updatePermissions',
  'organization.members.remove',
  'organization.members.view',
  'organization.members.updateRoles',
  'organization.invites.create',
  'organization.invites.delete',
  'inventory.create',
  'inventory.view',
  'inventory.edit',
  'inventory.delete',
  'item.create',
  'item.edit',
  'item.delete',
  'item.view',
] as const;

export type Permission = typeof ALL_PERMISSIONS[number];

export type Role = Named & {
  permissions: Permission[]
};

export type VuefireUser = {
  firstName: string
  lastName: string
  theme: string
  language: string
  organizations: string[]
};

export type User = {
  firstName: string
  lastName: string
  theme: string
  language: string
  organizations: DocumentReference[]
};

export type MemberVuefire = {
  id: string
  roles: string[]
  joined: number
};

export type Member = {
  roles: DocumentReference[]
  joined: number
};

export type Item = Named & {
  unitPrice: number
  unit: string
  attributes: (Record<string, string> | Record<string, number> | string)[]
  iconURL: string
  quantity: number
};

export enum ColumnType {
  ICON_URL = 'ICON',
  ATTRIBUTES = 'ATTRIBUTES',
  NAME = 'NAME',
  QUANTITY = 'QUANTITY',
  UNIT = 'UNIT',
  UNIT_PRICE = 'UNIT_PRICE',
  TOTAL_PRICE = 'TOTAL_PRICE',
}

export type Inventory = Named & WithId & {
  items: Item[]
};

export type CountryData = {
  countryCode: string
  country: string
};

export type Organization = Named & CountryData & {
  owner: DocumentReference<User>
  invites: string[]
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
