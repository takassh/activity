import { Emoji } from './emoji';
import { File } from './file';
import { Parent } from './parent';
import { RichText } from './rich_text';
import { User } from './user';

export type Page = {
  id: string;
  created_time: string;
  created_by: User;
  last_edited_time: string;
  last_edited_by: User;
  archived: boolean;
  icon?: Icon;
  cover?: File;
  properties: Record<string, PageProperty>;
  parent: Parent;
  url: string;
  public_url?: string;
};

export type Icon = File | Emoji;

export type CheckBox = {
  type: 'checkbox';
  id?: string;
  checkbox: boolean;
};

export type CreatedBy = {
  type: 'created_by';
  id?: string;
  created_by: User;
};

export type CreatedTime = {
  type: 'created_time';
  id?: string;
  created_time: string;
};

export type Date = {
  type: 'date';
  id?: string;
  date?: DatePropertyValue;
};

export type Email = {
  type: 'email';
  id?: string;
  email?: string;
};

export type Files = {
  type: 'files';
  id?: string;
  files: FilePropertyValue[];
};

export type Formula = {
  type: 'formula';
  id?: string;
  formula?: FormulaPropertyValue;
};

export type LastEditedBy = {
  type: 'last_edited_by';
  id?: string;
  last_edited_by: User;
};

export type LastEditedTime = {
  type: 'last_edited_time';
  id?: string;
  last_edited_time: string;
};

export type MultiSelect = {
  type: 'multi_select';
  id?: string;
  multi_select: SelectPropertyValue[];
};

export type Number = {
  type: 'number';
  id?: string;
  number?: Number;
};

export type People = {
  type: 'people';
  id?: string;
  people: User[];
};

export type PhoneNumber = {
  type: 'phone_number';
  id?: string;
  phone_number?: string;
};

export type Relation = {
  type: 'relation';
  id?: string;
  relation: RelationPropertyValue[];
  has_more?: boolean;
};

export type Rollup = {
  type: 'rollup';
  id?: string;
  rollup?: RollupPropertyValue;
};

export type _RichText = {
  type: 'rich_text';
  id?: string;
  rich_text: RichText[];
};

export type Select = {
  type: 'select';
  id?: string;
  select?: SelectPropertyValue;
};

export type Status = {
  type: 'status';
  id?: string;
  status?: SelectPropertyValue;
};

export type Title = {
  type: 'title';
  id?: string;
  title: RichText[];
};

export type Url = {
  type: 'url';
  id?: string;
  url?: string;
};

export type UniqueID = {
  type: 'unique_id';
  id?: string;
  unique_id?: UniqueIDPropertyValue;
};

export type Verification = {
  type: 'verification';
  id?: string;
  verification?: VerificationPropertyValue;
};

export type PageProperty =
  | CheckBox
  | CreatedBy
  | CreatedTime
  | Date
  | Email
  | Files
  | Formula
  | LastEditedBy
  | LastEditedTime
  | MultiSelect
  | Number
  | People
  | PhoneNumber
  | Relation
  | Rollup
  | _RichText
  | Select
  | Status
  | Title
  | Url
  | UniqueID
  | Verification;

export function IsPagePropertyTypeCheckBox(
  property?: PageProperty,
): property is CheckBox {
  return property?.type === 'checkbox';
}

export function IsPagePropertyTypeCreatedBy(
  property?: PageProperty,
): property is CreatedBy {
  return property?.type === 'created_by';
}

export function IsPagePropertyTypeCreatedTime(
  property?: PageProperty,
): property is CreatedTime {
  return property?.type === 'created_time';
}

export function IsPagePropertyTypeDate(
  property?: PageProperty,
): property is Date {
  return property?.type === 'date';
}

export function IsPagePropertyTypeEmail(
  property?: PageProperty,
): property is Email {
  return property?.type === 'email';
}

export function IsPagePropertyTypeFiles(
  property?: PageProperty,
): property is Files {
  return property?.type === 'files';
}

export function IsPagePropertyTypeFormula(
  property?: PageProperty,
): property is Formula {
  return property?.type === 'formula';
}

export function IsPagePropertyTypeLastEditedBy(
  property?: PageProperty,
): property is LastEditedBy {
  return property?.type === 'last_edited_by';
}

export function IsPagePropertyTypeLastEditedTime(
  property?: PageProperty,
): property is LastEditedTime {
  return property?.type === 'last_edited_time';
}

export function IsPagePropertyTypeMultiSelect(
  property?: PageProperty,
): property is MultiSelect {
  return property?.type === 'multi_select';
}

export function IsPagePropertyTypeNumber(
  property?: PageProperty,
): property is Number {
  return property?.type === 'number';
}

export function IsPagePropertyTypePeople(
  property?: PageProperty,
): property is People {
  return property?.type === 'people';
}

export function IsPagePropertyTypePhoneNumber(
  property?: PageProperty,
): property is PhoneNumber {
  return property?.type === 'phone_number';
}

export function IsPagePropertyTypeRelation(
  property?: PageProperty,
): property is Relation {
  return property?.type === 'relation';
}

export function IsPagePropertyTypeRollup(
  property?: PageProperty,
): property is Rollup {
  return property?.type === 'rollup';
}

export function IsPagePropertyTypeRichText(
  property?: PageProperty,
): property is _RichText {
  return property?.type === 'rich_text';
}

export function IsPagePropertyTypeSelect(
  property?: PageProperty,
): property is Select {
  return property?.type === 'select';
}

export function IsPagePropertyTypeStatus(
  property?: PageProperty,
): property is Status {
  return property?.type === 'status';
}

export function IsPagePropertyTypeTitle(
  property?: PageProperty,
): property is Title {
  return property?.type === 'title';
}

export function IsPagePropertyTypeUrl(
  property?: PageProperty,
): property is Url {
  return property?.type === 'url';
}

export function IsPagePropertyTypeUniqueID(
  property?: PageProperty,
): property is UniqueID {
  return property?.type === 'unique_id';
}

export function IsPagePropertyTypeVerification(
  property?: PageProperty,
): property is Verification {
  return property?.type === 'verification';
}

export enum Color {
  Default,
  Gray,
  Brown,
  Red,
  Orange,
  Yellow,
  Green,
  Blue,
  Purple,
  Pink,
}

export type DatePropertyValue = {
  start?: DateOrDateTime;
  end?: DateOrDateTime;
  time_zone?: string;
};

export type DateOrDateTime = Date | string;

export type FormulaPropertyValue =
  | {
      type: 'string';
      string?: string;
    }
  | {
      type: 'number';
      number?: Number;
    }
  | {
      type: 'boolean';
      boolean: boolean;
    }
  | {
      type: 'date';
      date?: DatePropertyValue;
    };

export type RelationPropertyValue = {
  id: string;
};

export type RollupPropertyValue =
  | {
      type: 'array';
      function: RollupFunction;
      array: RollupPropertyValue[];
    }
  | {
      type: 'date';
      function: RollupFunction;
      date: string;
    }
  | {
      type: 'incomplete';
      function: RollupFunction;
      incomplete?: string;
    }
  | {
      type: 'number';
      function: RollupFunction;
      number: Number;
    }
  | {
      type: 'unsupported';
      function: RollupFunction;
      unsupported?: string;
    };

export enum RollupFunction {
  Average,
  Checked,
  Count,
  CountPerGroup,
  CountValues,
  DateRange,
  EarliestDate,
  Empty,
  LatestDate,
  Max,
  Median,
  Min,
  NotEmpty,
  PercentChecked,
  PercentEmpty,
  PercentNotEmpty,
  PercentPerGroup,
  PercentUnchecked,
  Range,
  ShowOriginal,
  ShowUnique,
  Sum,
  Unchecked,
  Unique,
}

export type FilePropertyValue = {
  name: string;
  file: File;
};

export type SelectPropertyValue = {
  id?: string;
  name?: string;
  color?: Color;
};

export type UniqueIDPropertyValue = {
  number: Number;
  prefix?: string;
};

export type VerificationPropertyValue = {
  state: VerificationState;
  verified_by?: User;
  date?: DatePropertyValue;
};

export enum VerificationState {
  Verified = 'Verified',
  Unverified = 'Unverified',
}
