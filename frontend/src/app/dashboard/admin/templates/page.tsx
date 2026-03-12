"use client";

import { useAdminTemplates } from "@/hooks/use-admin";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Loader2,
  BookOpen,
  Pencil,
  Trash2,
  Star,
  StarOff,
} from "lucide-react";
import { useState } from "react";
import type { TemplateCategory } from "@/types";

const categories: { value: TemplateCategory; label: string }[] = [
  { value: "journal_article", label: "Journal Article" },
  { value: "conference_paper", label: "Conference Paper" },
  { value: "thesis", label: "Thesis" },
  { value: "report", label: "Report" },
  { value: "book", label: "Book" },
  { value: "cv", label: "CV" },
  { value: "other", label: "Other" },
];

interface TemplateForm {
  name: string;
  slug: string;
  description: string;
  journal_name: string;
  publisher: string;
  category: TemplateCategory;
  main_class_file: string;
  bibliography_style: string;
}

const emptyForm: TemplateForm = {
  name: "",
  slug: "",
  description: "",
  journal_name: "",
  publisher: "",
  category: "journal_article",
  main_class_file: "",
  bibliography_style: "",
};

export default function AdminTemplatesPage() {
  const { templates, loading, create, update, remove } = useAdminTemplates();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TemplateForm>(emptyForm);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await update(editingId, form);
    } else {
      await create({ ...form, is_active: true, is_featured: false });
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleEdit = (t: typeof templates[0]) => {
    setEditingId(t.id);
    setForm({
      name: t.name,
      slug: t.slug,
      description: t.description ?? "",
      journal_name: t.journal_name ?? "",
      publisher: t.publisher ?? "",
      category: t.category,
      main_class_file: t.main_class_file ?? "",
      bibliography_style: t.bibliography_style ?? "",
    });
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Template Management</h1>
          <p className="mt-1 text-sm text-gray-500">{templates.length} templates</p>
        </div>
        <Button
          className="gap-2"
          onClick={() => {
            setEditingId(null);
            setForm(emptyForm);
            setShowForm(!showForm);
          }}
        >
          <Plus className="h-4 w-4" /> {showForm ? "Cancel" : "New Template"}
        </Button>
      </div>

      {/* Create/Edit Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-xl border border-gray-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900">
            {editingId ? "Edit Template" : "Create Template"}
          </h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {[
              { key: "name", label: "Name", placeholder: "Nature Research Article" },
              { key: "slug", label: "Slug", placeholder: "nature" },
              { key: "journal_name", label: "Journal", placeholder: "Nature" },
              { key: "publisher", label: "Publisher", placeholder: "Springer Nature" },
              { key: "main_class_file", label: "Main Class File", placeholder: "nature.cls" },
              { key: "bibliography_style", label: "Bibliography Style", placeholder: "naturemag" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-medium text-gray-600">{f.label}</label>
                <input
                  type="text"
                  value={form[f.key as keyof TemplateForm] as string}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  placeholder={f.placeholder}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
                  required={f.key === "name" || f.key === "slug"}
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-600">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value as TemplateCategory })}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                {categories.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-gray-600">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={2}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary-300 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingId ? "Save Changes" : "Create Template"}</Button>
          </div>
        </form>
      )}

      {/* Templates List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-gray-300" />
          </div>
        ) : (
          templates.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <BookOpen className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{t.name}</p>
                    {t.is_featured && (
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    )}
                    {!t.is_active && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs text-red-600">
                        Disabled
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    {t.publisher} · {t.category.replace("_", " ")} · v{t.version}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => update(t.id, { is_featured: !t.is_featured })}
                  title={t.is_featured ? "Unfeature" : "Feature"}
                >
                  {t.is_featured ? (
                    <StarOff className="h-4 w-4" />
                  ) : (
                    <Star className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleEdit(t)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => update(t.id, { is_active: !t.is_active })}
                >
                  {t.is_active ? "Disable" : "Enable"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => {
                    if (confirm(`Delete template "${t.name}"?`)) remove(t.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
