'use client';
import '@/app/extensions/date';
import { Image, Link, Spacer, Stack, Tag, Text } from '@chakra-ui/react';
import { RichText } from '../types/rich_text';
import { Paragraph } from './blocks/paragraph';

type ArticleItemProps = {
  href: string;
  id: string;
  title: RichText[];
  summary: RichText[];
  imageUrl: string;
  tags: string[];
  readTime: string;
  createdAt: string;
};

export default function ArticleItem({
  href,
  id,
  title,
  summary,
  imageUrl,
  tags,
  createdAt,
}: ArticleItemProps) {
  return (
    <Link href={href}>
      <Stack>
        <Stack direction="row">
          <Stack>
            <Paragraph
              id={id}
              text={title}
              fontSize={['md', 'lg']}
              fontWeight="bold"
            />
            <Paragraph
              id={id}
              text={summary}
              fontSize={['sm', 'md']}
              fontWeight="normal"
            />
          </Stack>
          <Spacer />
          <Image
            src={imageUrl}
            height={[100]}
            width={[100]}
            rounded="lg"
            objectFit="cover"
            alt="article image"
          />
        </Stack>
        <Stack direction="row">
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`} fontSize={['xs', 'sm']}>
              {tag}
            </Tag>
          ))}
          <Text fontSize={['xs']} noOfLines={1} color="gray.500">
            {new Date(createdAt).formattedDateTime()}
          </Text>
        </Stack>
      </Stack>
    </Link>
  );
}
