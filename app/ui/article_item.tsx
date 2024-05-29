'use client';
import '@/app/extensions/date';
import {
  Button,
  FormControl,
  Image,
  Input,
  Link,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { faHurricane } from '@fortawesome/free-solid-svg-icons';
import { Field, FieldProps, Form, Formik } from 'formik';
import { nudge } from '../api/action';
import { RichText } from '../types/rich_text';
import { PlainTexts } from './blocks/plain_texts';
import { ToolTipIconModal } from './tool_tip_icon_modal';

type ArticleItemProps = {
  href: string;
  id: string;
  title: RichText[];
  summary: RichText[];
  imageUrl: string;
  tags: string[];
  readTime: string;
  createdAt: string;
  draft: boolean;
};

export default function ArticleItem({
  href,
  id,
  title,
  summary,
  imageUrl,
  tags,
  createdAt,
  draft,
}: ArticleItemProps) {
  return (
    <Link href={href}>
      <Stack spacing={[2, 4]}>
        <Stack direction="row" alignItems="start">
          <Stack width="100%">
            <PlainTexts
              id={id}
              text={title}
              fontSize={['md', 'lg']}
              fontWeight="bold"
            />
            {summary.length == 0 ? (
              <Text fontSize={['xs', 'md']} color="gray.500">
                Still in draft form, but you can hurry me up →
                <ToolTipIconModal
                  title="hurry me up"
                  ml={2}
                  icon={faHurricane}
                  fontSize={['sm', 'md']}
                >
                  <Stack>
                    <Formik
                      initialValues={{ content: '' }}
                      onSubmit={async (values, actions) => {
                        await nudge(id, values.content);
                      }}
                    >
                      {(props) =>
                        props.submitCount == 0 ? (
                          <Form>
                            <Text mb={2}>Give me your message 👏</Text>
                            <Field name="content">
                              {({ field }: FieldProps<string>) => (
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="I'm looking forward to seeing this article!"
                                  />
                                </FormControl>
                              )}
                            </Field>
                            <Button
                              mt={4}
                              colorScheme="blue"
                              isLoading={props.isSubmitting}
                              type="submit"
                            >
                              Nudge
                            </Button>
                          </Form>
                        ) : (
                          <Text>Thank you for your nudge! 🚀</Text>
                        )
                      }
                    </Formik>
                  </Stack>
                </ToolTipIconModal>
              </Text>
            ) : (
              <PlainTexts
                id={id}
                text={summary}
                fontSize={['sm', 'md']}
                fontWeight="normal"
                noOfLines={3}
              />
            )}
          </Stack>
          <Image
            src={imageUrl}
            height={[100, 120]}
            width="100%"
            maxW={[100, 150]}
            minW={[100, 150]}
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
