'use client';

import { useForm } from '@tanstack/react-form-nextjs';
import { z } from 'zod';

import { Button } from '../ui/button';
import { Field, FieldGroup, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { useLogin } from '@/hooks/api/useLogin';

const schema = z.object({
	email: z.email(),
});

export const LoginFormClient = () => {
	const { mutate: login } = useLogin();
	const form = useForm({
		defaultValues: {
			email: '',
		},
		validators: {
			onSubmit: schema,
		},
		onSubmit: async ({ value }) => {
			login(value.email);
		},
	});

	return (
		<form
			id="login-form"
			className="w-full border rounded-[20px] p-8 border-gray-300 bg-gray-50"
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldGroup>
				<form.Field
					name="email"
					validators={{
						onChange: schema.shape.email,
					}}
				>
					{(field) => (
						<Field>
							<FieldLabel
								htmlFor={field.name}
								className="text-gray-600 text-xl font-medium"
							>
								이메일 주소를 입력해주세요.
							</FieldLabel>
							<Input
								id={field.name}
								name={field.name}
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								type="email"
								className="bg-white border-gray-700 h-[75px] text-xl! font-semibold"
								placeholder="test@test.com"
							/>
						</Field>
					)}
				</form.Field>
				<Field>
					<Button
						type="submit"
						className="h-[77px] text-xl font-semibold rounded-[20px] cursor-pointer"
					>
						로그인 하기
					</Button>
				</Field>
			</FieldGroup>
		</form>
	);
};
