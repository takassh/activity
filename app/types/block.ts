import { File, HostedFile } from './file';
import { Parent } from './parent';
import { RichText } from './rich_text';
import { User } from './user';

export type Block = {
  object?: string;
  id: string;
  parent?: Parent;
  created_time?: string;
  created_by?: User;
  last_edited_time?: string;
  last_edited_by?: User;
  archived?: boolean;
  has_children?: boolean;

  type: string;
  bookmark?: BookmarkValue;
  breadcrump?: BreadcrumpValue;
  bulleted_list_item?: BulletedListItemValue;
  callout?: CalloutValue;
  child_database?: ChildDatabaseValue;
  child_page?: ChildPageValue;
  code?: CodeValue;
  column_list?: ColumnListValue;
  column?: ColumnValue;
  divider?: DividerValue;
  embed?: EmbedValue;
  equation?: EquationValue;
  file?: FileValue;
  heading_1?: HeadingsValue;
  heading_2?: HeadingsValue;
  heading_3?: HeadingsValue;
  image?: File;
  link_preview?: LinkPreviewValue;
  numbered_list_item?: NumberedListItemValue;
  paragraph?: ParagraphValue;
  pdf?: PdfValue;
  quote?: QuoteValue;
  synced_block?: SyncedBlockValue;
  table?: TableValue;
  table_of_contents?: TableOfContentsValue;
  table_row?: TableRowsValue;
  template?: TemplateValue;
  to_do?: ToDoValue;
  toggle?: ToggleValue;
  video?: File;
  link_to_page?: Parent;
};

export function isBlockTypeBookmark(
  block: Block,
): block is Block & { bookmark: BookmarkValue } {
  return block.bookmark !== undefined;
}

export function isBlockTypeBreadcrump(
  block: Block,
): block is Block & { breadcrump: BreadcrumpValue } {
  return block.breadcrump !== undefined;
}

export function isBlockTypeBulletedListItem(
  block: Block,
): block is Block & { bulleted_list_item: BulletedListItemValue } {
  return block.bulleted_list_item !== undefined;
}

export function isBlockTypeCallout(
  block: Block,
): block is Block & { callout: CalloutValue } {
  return block.callout !== undefined;
}

export function isBlockTypeChildDatabase(
  block: Block,
): block is Block & { child_database: ChildDatabaseValue } {
  return block.child_database !== undefined;
}

export function isBlockTypeChildPage(
  block: Block,
): block is Block & { child_page: ChildPageValue } {
  return block.child_page !== undefined;
}

export function isBlockTypeCode(
  block: Block,
): block is Block & { code: CodeValue } {
  return block.code !== undefined;
}

export function isBlockTypeColumnList(
  block: Block,
): block is Block & { column_list: ColumnListValue } {
  return block.column_list !== undefined;
}

export function isBlockTypeColumn(
  block: Block,
): block is Block & { column: ColumnValue } {
  return block.column !== undefined;
}

export function isBlockTypeDivider(
  block: Block,
): block is Block & { divider: DividerValue } {
  return block.divider !== undefined;
}

export function isBlockTypeEmbed(
  block: Block,
): block is Block & { embed: EmbedValue } {
  return block.embed !== undefined;
}

export function isBlockTypeEquation(
  block: Block,
): block is Block & { equation: EquationValue } {
  return block.equation !== undefined;
}

export function isBlockTypeFile(
  block: Block,
): block is Block & { file: FileValue } {
  return block.file !== undefined;
}

export function isBlockTypeHeading1(
  block: Block,
): block is Block & { heading_1: HeadingsValue } {
  return block.heading_1 !== undefined;
}

export function isBlockTypeHeading2(
  block: Block,
): block is Block & { heading_2: HeadingsValue } {
  return block.heading_2 !== undefined;
}

export function isBlockTypeHeading3(
  block: Block,
): block is Block & { heading_3: HeadingsValue } {
  return block.heading_3 !== undefined;
}

export function isBlockTypeImage(
  block: Block,
): block is Block & { image: File } {
  return block.image !== undefined;
}

export function isBlockTypeLinkPreview(
  block: Block,
): block is Block & { link_preview: LinkPreviewValue } {
  return block.link_preview !== undefined;
}

export function isBlockTypeNumberedListItem(
  block: Block,
): block is Block & { numbered_list_item: NumberedListItemValue } {
  return block.numbered_list_item !== undefined;
}

export function isBlockTypeParagraph(
  block: Block,
): block is Block & { paragraph: ParagraphValue } {
  return block.paragraph !== undefined;
}

export function isBlockTypePdf(
  block: Block,
): block is Block & { pdf: PdfValue } {
  return block.pdf !== undefined;
}

export function isBlockTypeQuote(
  block: Block,
): block is Block & { quote: QuoteValue } {
  return block.quote !== undefined;
}

export function isBlockTypeSyncedBlock(
  block: Block,
): block is Block & { synced_block: SyncedBlockValue } {
  return block.synced_block !== undefined;
}

export function isBlockTypeTable(
  block: Block,
): block is Block & { table: TableValue } {
  return block.table !== undefined;
}

export function isBlockTypeTableOfContents(
  block: Block,
): block is Block & { table_of_contents: TableOfContentsValue } {
  return block.table_of_contents !== undefined;
}

export function isBlockTypeTableRow(
  block: Block,
): block is Block & { table_row: TableRowsValue } {
  return block.table_row !== undefined;
}

export function isBlockTypeTemplate(
  block: Block,
): block is Block & { template: TemplateValue } {
  return block.template !== undefined;
}

export function isBlockTypeToDo(
  block: Block,
): block is Block & { to_do: ToDoValue } {
  return block.to_do !== undefined;
}

export function isBlockTypeToggle(
  block: Block,
): block is Block & { toggle: ToggleValue } {
  return block.toggle !== undefined;
}

export function isBlockTypeVideo(
  block: Block,
): block is Block & { video: File } {
  return block.video !== undefined;
}

export function isBlockTypeLinkToPage(
  block: Block,
): block is Block & { link_to_page: Parent } & { page_id: string } {
  return (
    block.link_to_page !== undefined && block.link_to_page.page_id !== undefined
  );
}

export type BookmarkValue = {
  caption: RichText[];
  url: string;
};

export type BreadcrumpValue = {};

export type BulletedListItemValue = {
  rich_text: RichText[];
  color: TextColor;
  children?: Block[];
};

export type CalloutValue = {
  rich_text: RichText[];
  icon: Icon;
  color: TextColor;
};

export type ChildDatabaseValue = {
  title: string;
};

export type ChildPageValue = {
  title: string;
};

export type CodeValue = {
  caption: RichText[];
  rich_text: RichText[];
  language: Language;
};

export type ColumnListValue = {};

export type ColumnValue = {};

export type DividerValue = {};

export type EmbedValue = {
  url: string;
};

export type EquationValue = {
  expression: string;
};

export type FileValue = {
  caption: RichText[];
  file_type: File;
  name: string;
};

export type HeadingsValue = {
  rich_text: RichText[];
  color?: TextColor;
  is_toggleable?: boolean;
};

export type LinkPreviewValue = {
  url: string;
};

export type NumberedListItemValue = {
  rich_text: RichText[];
  color: TextColor;
  children?: Block[];
};

export type ParagraphValue = {
  rich_text: RichText[];
  color?: TextColor;
  children?: Block[];
};

export type PdfValue = {
  caption: RichText[];
  file_type: File;
};

export type QuoteValue = {
  rich_text: RichText[];
  color: TextColor;
  children?: Block[];
};

export type SyncedBlockValue = {
  synced_from: SyncedFrom;
  children?: Block[];
};

export type SyncedFrom = {
  block_id?: string;
};

export type TableValue = {
  table_width: number;
  has_column_header: boolean;
  has_row_header: boolean;
  children?: Block[];
};

export type TableRowsValue = {
  cells: RichText[][];
};

export type TableOfContentsValue = {
  color: TextColor;
};

export type TemplateValue = {
  rich_text: RichText[];
  children?: Block[];
};

export type ToDoValue = {
  rich_text: RichText[];
  checked?: boolean;
  color?: TextColor;
  children?: Block[];
};

export type ToggleValue = {
  rich_text: RichText[];
  color: TextColor;
  children?: Block[];
};

export enum TextColor {
  Blue,
  BlueBackground,
  Brown,
  BrownBackground,
  Default,
  Gray,
  GrayBackground,
  Green,
  GreenBackground,
  Orange,
  OrangeBackground,
  Yellow,
  YellowBackground,
  Pink,
  PinkBackground,
  Purple,
  PurpleBackground,
  Red,
  RedBackground,
}

export type Icon = {
  file?: HostedFile;
  emoji?: string;
};

export function isIconTypeFile(
  icon: Icon,
): icon is Icon & { file: HostedFile } {
  return icon.file !== undefined;
}

export function isIconTypeEmoji(icon: Icon): icon is Icon & { emoji: string } {
  return icon.emoji !== undefined;
}

export enum Language {
  Abap,
  Arduino,
  Bash,
  Basic,
  C,
  Clojure,
  Coffeescript,
  CPlusPlus,
  CSharp,
  Css,
  Dart,
  Diff,
  Docker,
  Elixir,
  Elm,
  Erlang,
  Flow,
  Fortran,
  FSharp,
  Gherkin,
  Glsl,
  Go,
  Graphql,
  Groovy,
  Haskell,
  Html,
  Java,
  Javascript,
  Json,
  Julia,
  Kotlin,
  Latex,
  Less,
  Lisp,
  Livescript,
  Lua,
  Makefile,
  Markdown,
  Markup,
  Matlab,
  Mermaid,
  Nix,
  ObjectiveC,
  Ocaml,
  Pascal,
  Perl,
  Php,
  PlainText,
  Powershell,
  Prolog,
  Protobuf,
  Python,
  R,
  Reason,
  Ruby,
  Rust,
  Sass,
  Scala,
  Scheme,
  Scss,
  Shell,
  Sql,
  Swift,
  Typescript,
  VbNet,
  Verilog,
  Vhdl,
  VisualBasic,
  Webassembly,
  Xml,
  Yaml,
  JavaOrCOrCPlusPlusOrCSharp,
}

export function IsBlocks(blocks?: Block[]): blocks is Block[] {
  return blocks !== null;
}
