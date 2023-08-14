import { Link, useForm, Head } from '@inertiajs/react';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRoute } from '@/Hooks/useRoute';
import { useTypedPage } from '@/Hooks/useTypedPage';
import { AuthenticationCard } from '@/Components/AuthenticationCard';
import { Checkbox } from '@/Components/Checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputError } from '@/Components/InputError';

function Register() {
  const page = useTypedPage();
  const route = useRoute();
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    terms: false,
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('register'), {
      onFinish: () => form.reset('password', 'password_confirmation'),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Register" />

      <form onSubmit={onSubmit}>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={form.data.name}
            onChange={(e) => form.setData('name', e.currentTarget.value)}
            required
            autoFocus
            autoComplete="name"
          />
          <InputError className="mt-2" message={form.errors.name} />
        </div>

        <div className="mt-4">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1 block w-full"
            value={form.data.email}
            onChange={(e) => form.setData('email', e.currentTarget.value)}
            required
          />
          <InputError className="mt-2" message={form.errors.email} />
        </div>

        <div className="mt-4">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={(e) => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="mt-4">
          <Label htmlFor="password_confirmation">Confirm Password</Label>
          <Input
            id="password_confirmation"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password_confirmation}
            onChange={(e) => form.setData('password_confirmation', e.currentTarget.value)}
            required
            autoComplete="new-password"
          />
          <InputError className="mt-2" message={form.errors.password_confirmation} />
        </div>

        {page.props.jetstream.hasTermsAndPrivacyPolicyFeature && (
          <div className="mt-4">
            <Label htmlFor="terms">
              <div className="flex items-center">
                <Checkbox
                  name="terms"
                  id="terms"
                  checked={form.data.terms}
                  onChange={(e) => form.setData('terms', e.currentTarget.checked)}
                  required
                />

                <div className="ml-2">
                  I agree to the
                  <a
                    target="_blank"
                    href={route('terms.show')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    rel="noreferrer"
                  >
                    Terms of Service
                  </a>
                  and
                  <a
                    target="_blank"
                    href={route('policy.show')}
                    className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </div>
              </div>
              <InputError className="mt-2" message={form.errors.terms} />
            </Label>
          </div>
        )}

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('login')}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Already registered?
          </Link>

          <Button
            className={cn('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Register
          </Button>
        </div>
      </form>
    </AuthenticationCard>
  );
}

export default Register;
