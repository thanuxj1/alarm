"use client";
import { useState } from 'react';

export default function AlarmForm() {
  const [phone, setPhone] = useState('');
  const [delaySeconds, setDelaySeconds] = useState(60);
  const [calls, setCalls] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-alarm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, delaySeconds, calls }),
      });
      if (response.ok) {
        setMessage('Alarm scheduled successfully!');
      } else {
        setMessage('Failed to schedule alarm.');
      }
    } catch {
      setMessage('Error scheduling alarm.');
    }
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50 mb-8">
        Alarm Caller
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
            required
          />
        </div>
        <div>
          <label htmlFor="delay" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Delay (seconds)
          </label>
          <input
            type="number"
            id="delay"
            value={delaySeconds}
            onChange={(e) => setDelaySeconds(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
            min="1"
            required
          />
        </div>
        <div>
          <label htmlFor="calls" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Number of Calls
          </label>
          <input
            type="number"
            id="calls"
            value={calls}
            onChange={(e) => setCalls(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-zinc-800 dark:border-zinc-600 dark:text-zinc-100"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Schedule Alarm
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-zinc-600 dark:text-zinc-400">
          {message}
        </p>
      )}
    </>
  );
}