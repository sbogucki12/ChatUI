import * as React from 'react';
import { Modal, Text, Stack, DefaultButton, IButtonProps } from '@fluentui/react';

interface RulesModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onAccept }) => {
  const buttonProps: IButtonProps = {
    text: 'I Accept',
    // @ts-ignore - We'll ignore the type error for now to test functionality
    onClick: onAccept,
    primary: true
  };

  return (
    <Modal
      isOpen={isOpen}
      isBlocking={true}
      containerClassName="rules-modal-container"
    >
      <Stack tokens={{ padding: 20, childrenGap: 20 }}>
        <Text variant="xLarge">Rules of System Use</Text>
        <Text>
          Welcome to our system. Before proceeding, please read and accept our Rules of System Use:
          
          1. This system is for authorized users only.
          2. All actions are logged and monitored.
          3. Confidential information must be handled according to security policies.
          4. Report any suspicious activities immediately.
          5. Logout when you're done using the system.
        </Text>
        <Stack horizontal horizontalAlign="end">
          <DefaultButton {...buttonProps} />
        </Stack>
      </Stack>
    </Modal>
  );
};