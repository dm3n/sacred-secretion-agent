'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

export function SubscribeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', sun_sign: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong. Please try again.');
      setLoading(false);
      return;
    }

    router.push('/subscribed');
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="name" className="text-sm text-neutral-400 tracking-wide uppercase text-xs">Name</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
          required
          className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-600 h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-sm text-neutral-400 tracking-wide uppercase text-xs">Email</Label>
        <Input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
          required
          className="bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-600 focus-visible:ring-neutral-600 h-11"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sign" className="text-sm text-neutral-400 tracking-wide uppercase text-xs">Natal Sun Sign</Label>
        <Select
          value={form.sun_sign}
          onValueChange={(v) => setForm({ ...form, sun_sign: v ?? '' })}
          required
        >
          <SelectTrigger className="bg-neutral-900 border-neutral-800 text-white focus:ring-neutral-600 h-11">
            <SelectValue placeholder="Select your sun sign" className="text-neutral-600" />
          </SelectTrigger>
          <SelectContent className="bg-neutral-900 border-neutral-800 text-white">
            {SIGNS.map((s) => (
              <SelectItem key={s} value={s} className="focus:bg-neutral-800 focus:text-white">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-white text-black hover:bg-neutral-200 h-11 tracking-wide"
      >
        {loading ? 'Beginning the practice...' : 'Begin the practice'}
      </Button>
    </form>
  );
}
