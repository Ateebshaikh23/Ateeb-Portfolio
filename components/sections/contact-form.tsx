'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Info, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { profile } from '@/lib/data'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(80, 'Name is too long.'),
  email: z.email('Please enter a valid email address.'),
  subject: z.string().trim().min(3, 'Please add a short subject.').max(120, 'Subject is too long.'),
  message: z.string().trim().min(20, 'Message should be at least 20 characters.').max(2000, 'Message is too long.'),
})

type FormValues = z.infer<typeof schema>

const fieldClass =
  'w-full rounded-md border bg-background px-3 text-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring aria-[invalid=true]:border-destructive'

export function ContactForm() {
  const [opened, setOpened] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), mode: 'onTouched' })

  const onSubmit = (values: FormValues) => {
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
    window.location.href = href
    setOpened(true)
  }

  const fields = [
    { name: 'name', label: 'Name', type: 'text', autoComplete: 'name', placeholder: 'Your name' },
    { name: 'email', label: 'Email', type: 'email', autoComplete: 'email', placeholder: 'you@company.com' },
    { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off', placeholder: 'What would you like to discuss?' },
  ] as const

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-labelledby="contact-form-title"
      className="rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <h3 id="contact-form-title" className="text-lg font-semibold">
        Send a message
      </h3>
      <div className="mt-3 flex items-start gap-2.5 rounded-md border border-border bg-secondary/60 px-3 py-2.5 text-xs leading-relaxed text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
        <p>
          This form isn&apos;t connected to an email service yet. Submitting opens your email app with the message
          pre-filled — or write directly to{' '}
          <a href={`mailto:${profile.email}`} className="font-medium text-foreground underline underline-offset-2">
            {profile.email}
          </a>
          .
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.name} className={cn('flex flex-col gap-1.5', f.name === 'subject' && 'sm:col-span-2')}>
            <label htmlFor={`cf-${f.name}`} className="text-sm font-medium">
              {f.label}
            </label>
            <input
              id={`cf-${f.name}`}
              type={f.type}
              autoComplete={f.autoComplete}
              placeholder={f.placeholder}
              aria-invalid={errors[f.name] ? 'true' : 'false'}
              aria-describedby={errors[f.name] ? `cf-${f.name}-error` : undefined}
              className={cn(fieldClass, 'h-10 border-border')}
              {...register(f.name)}
            />
            {errors[f.name] ? (
              <p id={`cf-${f.name}-error`} className="text-xs text-destructive">
                {errors[f.name]?.message}
              </p>
            ) : null}
          </div>
        ))}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="cf-message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="cf-message"
            rows={5}
            placeholder="Tell me a little about the project or role…"
            aria-invalid={errors.message ? 'true' : 'false'}
            aria-describedby={errors.message ? 'cf-message-error' : undefined}
            className={cn(fieldClass, 'resize-y border-border py-2.5')}
            {...register('message')}
          />
          {errors.message ? (
            <p id="cf-message-error" className="text-xs text-destructive">
              {errors.message.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {opened ? 'Your email app should have opened with this message. Nothing has been sent yet.' : ''}
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Open in email app
          <Send className="size-4" aria-hidden />
        </button>
      </div>
    </form>
  )
}
