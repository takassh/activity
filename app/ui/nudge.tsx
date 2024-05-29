'use client';

import { Button, FormControl, Input, Stack, Text } from '@chakra-ui/react';
import { faHurricane } from '@fortawesome/free-solid-svg-icons';
import { Field, FieldProps, Form, Formik } from 'formik';
import { nudge } from '../api/action';
import { ToolTipIconModal } from './tool_tip_icon_modal';

export default function NudgeToolTip({ pageId: page_id }: { pageId: string }) {
  return (
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
            await nudge(page_id, values.content);
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
  );
}
