import { DatePropertyValue } from './notion_page';
import { User } from './user';

export type RichText =
  | {
      type: 'equation';
      equation: Equation;
      annotations: Annotations;
      plain_text: string;
      href: string | null;
    }
  | {
      type: 'mention';
      mention: Mention;
      annotations: Annotations;
      plain_text: string;
      href: string | null;
    }
  | {
      type: 'text';
      text: Text;
      annotations: Annotations | null;
      plain_text: string | null;
      href: string | null;
    };

export type Equation = {
  expression: string;
};

export type Text = {
  content: string;
  link: Link | null;
};

export enum TextColor {
  Default,
  Gray,
  Brown,
  Orange,
  Yellow,
  Green,
  Blue,
  Purple,
  Pink,
  Red,
  GrayBackground,
  BrownBackground,
  OrangeBackground,
  YellowBackground,
  GreenBackground,
  BlueBackground,
  PurpleBackground,
  PinkBackground,
  RedBackground,
}

export type Annotations = {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: TextColor;
};

export type Link = {
  url: string;
};

export type Mention =
  | {
      type: 'database';
      database: DatabaseMention;
    }
  | {
      type: 'date';
      date: DatePropertyValue;
    }
  | {
      type: 'link_preview';
      link_preview: LinkPreviewMention;
    }
  | {
      type: 'template_mention';
      template_mention: TemplateMention;
    }
  | {
      type: 'page';
      page: PageMention;
    }
  | {
      type: 'user';
      user: User;
    };

export type DatabaseMention = {
  id: string;
};

export type LinkPreviewMention = {
  url: string;
};

export type PageMention = {
  id: string;
};

export type TemplateMention =
  | {
      type: 'template_mention_date';
      template_mention_date: TemplateMentionDate;
    }
  | {
      type: 'template_mention_user';
      template_mention_user: TemplateMentionUser;
    };

export enum TemplateMentionDate {
  Today,
  Now,
}

export enum TemplateMentionUser {
  Me,
}
