import axios from 'axios';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { useRoute } from '@/Hooks/useRoute';
import { DialogModal } from '@/Components/DialogModal';
import { InputError } from '@/Components/InputError';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SecondaryButton } from '@/Components/SecondaryButton';

type Props = {
  title?: string;
  content?: string;
  button?: string;
  onConfirm(): void;
}

export function ConfirmsPassword({
  title = 'Confirm Password',
  content = 'For your security, please confirm your password to continue.',
  button = 'Confirm',
  onConfirm,
  children,
}: PropsWithChildren<Props>) {
  const route = useRoute();
  const [confirmingPassword, setConfirmingPassword] = useState(false);
  const [form, setForm] = useState({
    password: '',
    error: '',
    processing: false,
  });
  const passwordRef = useRef<HTMLInputElement>(null);

  function startConfirmingPassword() {
    axios.get(route('password.confirmation')).then((response) => {
      if (response.data.confirmed) {
        onConfirm();
      } else {
        setConfirmingPassword(true);

        setTimeout(() => passwordRef.current?.focus(), 250);
      }
    });
  }

  function confirmPassword() {
    setForm({ ...form, processing: true });

    axios
      .post(route('password.confirm'), {
        password: form.password,
      })
      .then(() => {
        closeModal();
        setTimeout(() => onConfirm(), 250);
      })
      .catch((error) => {
        setForm({
          ...form,
          processing: false,
          error: error.response.data.errors.password[0],
        });
        passwordRef.current?.focus();
      });
  }

  function closeModal() {
    setConfirmingPassword(false);
    setForm({ processing: false, password: '', error: '' });
  }

  return (
    <span>
      <span onClick={startConfirmingPassword}>{children}</span>
      <DialogModal isOpen={confirmingPassword} onClose={closeModal}>
        <DialogModal.Content title={title}>
          {content}

          <div className="mt-4">
            <Input
              ref={passwordRef}
              type="password"
              className="mt-1 block w-3/4"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.currentTarget.value })}
            />

            <InputError message={form.error} className="mt-2" />
          </div>
        </DialogModal.Content>

        <DialogModal.Footer>
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <Button
            className={cn('ml-2', { 'opacity-25': form.processing })}
            onClick={confirmPassword}
            disabled={form.processing}
          >
            {button}
          </Button>
        </DialogModal.Footer>
      </DialogModal>
    </span>
  );
}
