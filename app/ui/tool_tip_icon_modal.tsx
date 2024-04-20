'use client';
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { RefIcon } from './ref_icon';
import { ToolTipIcon, ToolTipIconProps } from './tool_tip_icon';

interface ToolTipIconModalProps extends Omit<ToolTipIconProps, 'tooltip'> {
  title: string;
  children: React.ReactNode;
}

export function ToolTipIconModal({
  title,
  children,
  ...props
}: ToolTipIconModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <ToolTipIcon {...props} onClick={onOpen} tooltip={title} />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex alignItems="baseline">
              {title}
              <RefIcon {...props} />
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
