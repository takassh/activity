'use client';
import '@/app/extensions/date';
import { Image, Link, Spacer, Stack, Tag, Text } from '@chakra-ui/react';
import { RichText } from '../types/rich_text';
import { PlainTexts } from './blocks/plain_texts';

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
      <Stack spacing={[2, 4]}>
        <Stack direction="row" alignItems="start">
          <Stack>
            <PlainTexts
              id={id}
              text={title}
              fontSize={['md', 'lg']}
              fontWeight="bold"
            />
            <PlainTexts
              id={id}
              text={summary}
              fontSize={['sm', 'md']}
              fontWeight="normal"
              noOfLines={3}
            />
          </Stack>
          <Spacer />
          <Image
            src={imageUrl}
            height={[100, 120]}
            width={[100, 120]}
            rounded="lg"
            objectFit="cover"
            alt="article image"
          />
        </Stack>
        <Stack direction="row" alignItems="end">
          <Text fontSize={['xs']} noOfLines={1} color="gray.500">
            {new Date(createdAt).formattedDateTime()}
          </Text>
          {tags.map((tag) => (
            <Tag key={`tag-${tag}`} fontSize={['xs', 'sm']}>
              {tag}
            </Tag>
          ))}
        </Stack>
      </Stack>
    </Link>
  );
}
