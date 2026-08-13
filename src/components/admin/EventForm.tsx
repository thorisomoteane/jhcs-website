"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Event, EventFormData } from "@/types/event";
import {
  createEvent,
  deleteEvent,
  updateEvent,
} from "@/lib/firebase/firestore";
import { deleteEventImage, uploadEventImage } from "@/lib/firebase/storage";
import { getEventStatus } from "@/lib/utils/dates";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ImageUpload } from "./ImageUpload";

interface EventFormProps {
  event?: Event | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const emptyForm: EventFormData = {
  title: "",
  description: "",
  date: "",
  imageFile: null,
};

export function EventForm({ event, onSuccess, onCancel }: EventFormProps) {
  const [form, setForm] = useState<EventFormData>(emptyForm);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        description: event.description,
        date: event.date.toISOString().slice(0, 16),
        imageFile: null,
      });
      setPreviewUrl(event.imageUrl);
    } else {
      setForm(emptyForm);
      setPreviewUrl(undefined);
    }
  }, [event]);

  function handleFileSelect(file: File | null) {
    setForm((prev) => ({ ...prev, imageFile: file }));
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else if (event?.imageUrl) {
      setPreviewUrl(event.imageUrl);
    } else {
      setPreviewUrl(undefined);
    }
  }

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

      if (event) {
        let imageUrl = event.imageUrl;
        let imagePath = event.imagePath;

        if (form.imageFile) {
          if (event.imagePath) {
            try {
              await deleteEventImage(event.imagePath);
            } catch {
              // ignore if old image already deleted
            }
          }
          const uploaded = await uploadEventImage(event.id, form.imageFile);
          imageUrl = uploaded.imageUrl;
          imagePath = uploaded.imagePath;
        }

        await updateEvent(event.id, {
          title: form.title.trim(),
          description: form.description.trim(),
          date: eventDate,
          status,
          imageUrl,
          imagePath,
        });
        toast.success("Event updated successfully.");
      } else {
        const id = await createEvent({
          title: form.title.trim(),
          description: form.description.trim(),
          date: eventDate,
          status,
        });

        if (form.imageFile) {
          const uploaded = await uploadEventImage(id, form.imageFile);
          await updateEvent(id, {
            imageUrl: uploaded.imageUrl,
            imagePath: uploaded.imagePath,
          });
        }
        toast.success("Event created successfully.");
      }

      onSuccess();
    } catch {
      toast.error("Failed to save event. Please try again.");
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
      <ImageUpload currentUrl={previewUrl} onFileSelect={handleFileSelect} />

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
    if (event.imagePath) {
      try {
        await deleteEventImage(event.imagePath);
      } catch {
        // ignore if image already deleted
      }
    }
    await deleteEvent(event.id);
    toast.success("Event deleted.");
    onSuccess();
  } catch {
    toast.error("Failed to delete event.");
  }
}
