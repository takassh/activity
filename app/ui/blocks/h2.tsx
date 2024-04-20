import { RichText } from '@/app/types/rich_text';
import { Paragraph } from './paragraph';

export function H2({ id, text }: { id: string; text: RichText[] }) {
  return <Paragraph id={id} text={text} fontSize="2xl" fontWeight="bold" />;
}
