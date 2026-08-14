"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createVolunteerApplication } from "@/lib/firebase/firestore";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import type { VolunteerFormData } from "@/types/volunteer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

const initialForm: VolunteerFormData = {
  name: "",
  email: "",
  phone: "",
  skills: "",
  message: "",
};

export function VolunteerForm() {
  const [form, setForm] = useState<VolunteerFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<VolunteerFormData>>({});
  const [submitting, setSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: Partial<VolunteerFormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    if (!isFirebaseConfigured()) {
      toast.error(
        "Applications can't be submitted yet. Please email or call us instead.",
      );
      return;
    }

    setSubmitting(true);
    try {
      await createVolunteerApplication({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        skills: form.skills.trim(),
        message: form.message.trim(),
      });
      toast.success("Thank you! Your volunteer application has been submitted.");
      setForm(initialForm);
      setErrors({});
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof VolunteerFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label="Full Name *"
        name="name"
        value={form.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Your full name"
      />
      <Input
        label="Email *"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="you@example.com"
      />
      <Input
        label="Phone *"
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        error={errors.phone}
        placeholder="+27 00 000 0000"
      />
      <Input
        label="Skills & Interests"
        name="skills"
        value={form.skills}
        onChange={handleChange}
        placeholder="Cooking, logistics, counselling..."
      />
      <Textarea
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="Tell us why you'd like to volunteer..."
      />
      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
