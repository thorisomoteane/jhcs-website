"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import type { Event, EventFormData } from "@/types/event";
import { createEvent, deleteEvent, updateEvent } from "@/lib/firebase/firestore";
import { getEventStatus } from "@/lib/utils/dates";
import { describeError } from "@/lib/utils/errors";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUrlField } from "./ImageUrlField";

interface EventFormProps {
  event?: Event | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm: EventFormData = {
  title: "",
  description: "",
  date: "",
  imageUrl: "",
};

function toFormData(event?: Event | null): EventFormData {
  if (!event) return emptyForm;
  return {
    title: event.title,
    description: event.description,
    date: event.date.toISOString().slice(0, 16),
    imageUrl: event.imageUrl ?? "",
  };
}

/**
 * Callers must pass a `key` that changes with the event being edited (see
 * the admin events page) — the initial state below is seeded once per mount
 * rather than re-synced from props by an effect.
 */
export function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>(() => toFormData(event));
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.date) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const eventDate = new Date(form.date);
      const status = getEventStatus(eventDate);
      const imageUrl = form.imageUrl.trim() || undefined;

      if (event) {
        await updateEvent(event.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          date: eventDate,
          status,
          imageUrl,
        });
        toast.success("Event updated successfully.");
      } else {
        await createEvent({
          title: form.title.trim(),
          description: form.description.trim(),
          date: eventDate,
          status,
          imageUrl,
        });
        toast.success("Event created successfully.");
      }

      onSuccess();
    } catch (err) {
      console.error("Failed to save event:", err);
      toast.error(`Failed to save event: ${describeError(err)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Title *"
        value={form.title}
        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
        placeholder="Event title"
      />
      <Textarea
        label="Description *"
        value={form.description}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="Event description"
      />
      <Input
        label="Date & Time *"
        type="datetime-local"
        value={form.date}
        onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
      />
      <ImageUrlField
        label="Event Image URL"
        value={form.imageUrl}
        onChange={(imageUrl) => setForm((prev) => ({ ...prev, imageUrl }))}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : event ? "Update Event" : "Create Event"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export async function handleDeleteEvent(event: Event, onSuccess: () => void) {
  if (!confirm(`Delete "${event.title}"? This cannot be undone.`)) return;

  try {
    await deleteEvent(event.id);
    toast.success("Event deleted.");
    onSuccess();
  } catch (err) {
    console.error("Failed to delete event:", err);
    toast.error(`Failed to delete event: ${describeError(err)}`);
  }
}
