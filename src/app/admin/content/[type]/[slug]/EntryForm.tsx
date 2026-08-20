"use client";

import { useState } from "react";
import Link from "next/link";
import { saveEntry } from "@/app/admin/actions";
import ImageUpload from "@/components/admin/ImageUpload";

type Props = {
  type: string;
  slug: string;
  isNew: boolean;
  entryTitle?: string;
  entrySlug?: string;
  entrySummary?: string;
  entryImage?: string;
  entryPosition?: number;
  entryFeatured?: boolean;
  entryPublished?: boolean;
  initialData: Record<string, any>;
};

export default function EntryForm({
  type,
  slug,
  isNew,
  entryTitle,
  entrySlug,
  entrySummary,
  entryImage,
  entryPosition,
  entryFeatured,
  entryPublished,
  initialData,
}: Props) {
  const [data, setData] = useState<Record<string, any>>(initialData);
  const [jsonError, setJsonError] = useState(false);
  // Tracks the primary image URL (mirrors the hidden <input name="image">)
  const [imageUrl, setImageUrl] = useState(entryImage ?? "");

  const field =
    "mt-2 w-full border border-ivory/12 bg-[#101010] px-4 py-3 text-sm text-ivory outline-none transition-colors focus:border-gold";
  const btn = "mt-2 px-3 py-1 text-xs border border-ivory/20 hover:border-gold transition-colors";
  const btnDel = "text-red-400 text-xs shrink-0 self-start mt-4";

  // Generic List Manager
  const updateList = (path: keyof typeof data, newList: any[]) => {
    setData((prev) => ({ ...prev, [path]: newList }));
  };

  const setField = (key: string, value: any) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const renderProjectForm = () => {
    return (
      <div className="space-y-12">
        {/* Basic String Fields */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="eyebrow text-ivory/40">Developer Name</span>
              <input value={data.developer || ""} onChange={(e) => setField("developer", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Developer Slug</span>
              <input value={data.developerSlug || ""} onChange={(e) => setField("developerSlug", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Locality</span>
              <input value={data.locality || ""} onChange={(e) => setField("locality", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">City</span>
              <input value={data.city || ""} onChange={(e) => setField("city", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Region</span>
              <input value={data.region || ""} onChange={(e) => setField("region", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Status</span>
              <input value={data.status || ""} onChange={(e) => setField("status", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Price From</span>
              <input value={data.priceFrom || ""} onChange={(e) => setField("priceFrom", e.target.value)} className={field} />
            </label>
            <label className="block">
              <span className="eyebrow text-ivory/40">Possession</span>
              <input value={data.possession || ""} onChange={(e) => setField("possession", e.target.value)} className={field} />
            </label>
          </div>
        </div>

        {/* Media & Styling */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Media & Theme</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ImageUpload
              label="Hero Image"
              value={data.heroImage || ""}
              onChange={(url) => setField("heroImage", url)}
            />
            <ImageUpload
              label="Card Image"
              value={data.cardImage || ""}
              onChange={(url) => setField("cardImage", url)}
            />
            <label className="block">
              <span className="eyebrow text-ivory/40">Accent Color</span>
              <input type="color" value={data.accent || "#c3a15c"} onChange={(e) => setField("accent", e.target.value)} className="h-10 mt-2 block" />
            </label>
          </div>
        </div>

        {/* Story */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Story Paragraphs</h3>
          {(data.story || []).map((paragraph: string, i: number) => (
            <div key={i} className="flex gap-4 mb-2">
              <textarea
                value={paragraph}
                rows={2}
                onChange={(e) => {
                  const newStory = [...data.story];
                  newStory[i] = e.target.value;
                  updateList("story", newStory);
                }}
                className={field}
              />
              <button type="button" onClick={() => updateList("story", data.story.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => updateList("story", [...(data.story || []), ""])} className={btn}>+ Add Paragraph</button>
        </div>

        {/* Gallery */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Gallery</h3>
          {(data.gallery || []).map((item: any, i: number) => (
            <div key={i} className="border border-ivory/10 p-4 mb-3 space-y-3">
              <ImageUpload
                label={`Image ${i + 1}`}
                value={item.src || ""}
                onChange={(url) => {
                  const arr = [...data.gallery];
                  arr[i] = { ...item, src: url };
                  updateList("gallery", arr);
                }}
              />
              <input
                placeholder="Caption (optional)"
                value={item.caption || ""}
                onChange={(e) => {
                  const arr = [...data.gallery];
                  arr[i] = { ...item, caption: e.target.value };
                  updateList("gallery", arr);
                }}
                className={field}
              />
              <button
                type="button"
                onClick={() => updateList("gallery", data.gallery.filter((_: any, idx: number) => idx !== i))}
                className={btnDel}
              >
                Remove image
              </button>
            </div>
          ))}
          <button type="button" onClick={() => updateList("gallery", [...(data.gallery || []), { src: "", caption: "" }])} className={btn}>+ Add Image</button>
        </div>

        {/* Architecture & Highlights (KV style) */}
        {['architecture', 'highlights', 'connectivity', 'timeline'].map((key) => {
          const list = data[key] || [];
          const labelField = key === 'architecture' ? 'title' : 'label';
          const valueField = key === 'architecture' ? 'copy' : 'value';
          
          return (
            <div key={key}>
              <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2 capitalize">{key}</h3>
              {list.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 mb-2">
                  <input placeholder={labelField} value={item[labelField] || ""} onChange={(e) => {
                    const arr = [...list];
                    arr[i] = { ...item, [labelField]: e.target.value };
                    updateList(key, arr);
                  }} className={field} />
                  <input placeholder={valueField} value={item[valueField] || ""} onChange={(e) => {
                    const arr = [...list];
                    arr[i] = { ...item, [valueField]: e.target.value };
                    updateList(key, arr);
                  }} className={field} />
                  <button type="button" onClick={() => updateList(key, list.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove</button>
                </div>
              ))}
              <button type="button" onClick={() => updateList(key, [...list, { [labelField]: "", [valueField]: "" }])} className={btn}>+ Add Item</button>
            </div>
          )
        })}

        {/* Amenities */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Amenities</h3>
          {(data.amenities || []).map((group: any, i: number) => (
            <div key={i} className="mb-6 border border-ivory/10 p-4">
              <div className="flex gap-4 mb-4">
                <input placeholder="Group Name (e.g. Wellness)" value={group.group || ""} onChange={(e) => {
                  const arr = [...data.amenities];
                  arr[i] = { ...group, group: e.target.value };
                  updateList("amenities", arr);
                }} className={field} />
                <button type="button" onClick={() => updateList("amenities", data.amenities.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove Group</button>
              </div>
              <div className="pl-4 border-l border-ivory/10 space-y-2">
                {(group.items || []).map((item: string, j: number) => (
                  <div key={j} className="flex gap-4">
                    <input value={item} onChange={(e) => {
                      const arr = [...data.amenities];
                      const newItems = [...group.items];
                      newItems[j] = e.target.value;
                      arr[i] = { ...group, items: newItems };
                      updateList("amenities", arr);
                    }} className={field} />
                    <button type="button" onClick={() => {
                      const arr = [...data.amenities];
                      const newItems = group.items.filter((_: any, idx: number) => idx !== j);
                      arr[i] = { ...group, items: newItems };
                      updateList("amenities", arr);
                    }} className={btnDel}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => {
                  const arr = [...data.amenities];
                  arr[i] = { ...group, items: [...(group.items || []), ""] };
                  updateList("amenities", arr);
                }} className={btn}>+ Add Amenity</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => updateList("amenities", [...(data.amenities || []), { group: "", items: [] }])} className={btn}>+ Add Amenity Group</button>
        </div>

        {/* Plans */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Floor Plans</h3>
          {(data.plans || []).map((plan: any, i: number) => (
            <div key={i} className="flex gap-4 mb-2">
              <input placeholder="Type (e.g. 2 BHK)" value={plan.type || ""} onChange={(e) => {
                const arr = [...data.plans];
                arr[i] = { ...plan, type: e.target.value };
                updateList("plans", arr);
              }} className={field} />
              <input placeholder="Carpet" value={plan.carpet || ""} onChange={(e) => {
                const arr = [...data.plans];
                arr[i] = { ...plan, carpet: e.target.value };
                updateList("plans", arr);
              }} className={field} />
              <input placeholder="Price" value={plan.price || ""} onChange={(e) => {
                const arr = [...data.plans];
                arr[i] = { ...plan, price: e.target.value };
                updateList("plans", arr);
              }} className={field} />
              <button type="button" onClick={() => updateList("plans", data.plans.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => updateList("plans", [...(data.plans || []), { type: "", carpet: "", price: "" }])} className={btn}>+ Add Plan</button>
        </div>

        {/* Configurations */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Configurations (e.g., 2 BHK, 3 BHK)</h3>
          <div className="flex flex-wrap gap-2">
            {(data.configurations || []).map((conf: string, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-[#1a1a1a] px-3 py-1 border border-ivory/10">
                <input
                  value={conf}
                  onChange={(e) => {
                    const newConfs = [...data.configurations];
                    newConfs[i] = e.target.value;
                    updateList("configurations", newConfs);
                  }}
                  className="bg-transparent text-sm w-24 outline-none text-ivory"
                />
                <button type="button" onClick={() => updateList("configurations", data.configurations.filter((_: any, idx: number) => idx !== i))} className="text-red-400 text-xs hover:text-red-300">
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => updateList("configurations", [...(data.configurations || []), ""])} className={btn}>+ Add Configuration</button>
        </div>

        {/* FAQs */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">FAQs</h3>
          {(data.faqs || []).map((faq: any, i: number) => (
            <div key={i} className="flex gap-4 mb-4 border border-ivory/10 p-4">
              <div className="flex-1 space-y-4">
                <input placeholder="Question" value={faq.q || ""} onChange={(e) => {
                  const newFaqs = [...data.faqs];
                  newFaqs[i] = { ...faq, q: e.target.value };
                  updateList("faqs", newFaqs);
                }} className={field} />
                <textarea placeholder="Answer" value={faq.a || ""} onChange={(e) => {
                  const newFaqs = [...data.faqs];
                  newFaqs[i] = { ...faq, a: e.target.value };
                  updateList("faqs", newFaqs);
                }} className={field} rows={2} />
              </div>
              <button type="button" onClick={() => updateList("faqs", data.faqs.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => updateList("faqs", [...(data.faqs || []), { q: "", a: "" }])} className={btn}>+ Add FAQ</button>
        </div>

        {/* RERA */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">RERA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block md:col-span-2">
              <span className="eyebrow text-ivory/40">RERA Note</span>
              <textarea value={data.reraNote || ""} onChange={(e) => setField("reraNote", e.target.value)} className={field} rows={2} />
            </label>
          </div>
          {(data.rera || []).map((item: string, i: number) => (
            <div key={i} className="flex gap-4 mb-2">
              <input value={item} onChange={(e) => {
                const arr = [...data.rera];
                arr[i] = e.target.value;
                updateList("rera", arr);
              }} className={field} placeholder="RERA Number" />
              <button type="button" onClick={() => updateList("rera", data.rera.filter((_: any, idx: number) => idx !== i))} className={btnDel}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => updateList("rera", [...(data.rera || []), ""])} className={btn}>+ Add RERA No.</button>
        </div>
        
        {/* Notes */}
        <div>
          <h3 className="nav-type text-ivory/40 mb-4 border-b border-ivory/10 pb-2">Notes</h3>
          <label className="block">
            <span className="eyebrow text-ivory/40">Masterplan Note</span>
            <textarea value={data.masterplanNote || ""} onChange={(e) => setField("masterplanNote", e.target.value)} className={field} rows={2} />
          </label>
        </div>

        {/* Fallback for other data attributes */}
        <div className="border-t border-ivory/10 pt-8 mt-12">
          <h3 className="nav-type text-ivory/40 mb-2">Other Data (JSON Fallback)</h3>
          <p className="text-xs text-ivory/30 mb-4">For custom or unmapped properties.</p>
          <textarea
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                setData(JSON.parse(e.target.value));
                setJsonError(false);
              } catch {
                setJsonError(true);
              }
            }}
            rows={15}
            spellCheck={false}
            className={`${field} font-mono text-xs leading-relaxed ${jsonError ? 'border-red-500' : ''}`}
          />
        </div>
      </div>
    );
  };

  const renderGenericForm = () => {
    return (
      <div className="pt-4">
        <label className="block">
          <span className="eyebrow text-ivory/40">
            Detail payload (JSON)
          </span>
          <textarea
            value={JSON.stringify(data, null, 2)}
            onChange={(e) => {
              try {
                setData(JSON.parse(e.target.value));
                setJsonError(false);
              } catch {
                setJsonError(true);
              }
            }}
            rows={26}
            spellCheck={false}
            className={`${field} font-mono text-xs leading-relaxed ${jsonError ? 'border-red-500' : ''}`}
          />
        </label>
      </div>
    );
  };

  return (
    <form action={saveEntry} className="mt-10 space-y-8">
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="originalSlug" value={isNew ? "" : slug} />

      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-ivory/40">Title / Name</span>
          <input
            name="title"
            required
            defaultValue={entryTitle ?? ""}
            className={field}
          />
        </label>
        <label className="block">
          <span className="eyebrow text-ivory/40">Slug</span>
          <input
            name="slug"
            required
            defaultValue={entrySlug ?? ""}
            className={field}
          />
        </label>
      </div>

      <label className="block">
        <span className="eyebrow text-ivory/40">Summary / Subtitle / Quote</span>
        <textarea
          name="summary"
          rows={2}
          defaultValue={entrySummary ?? ""}
          className={field}
        />
      </label>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <ImageUpload
            label="Primary image"
            value={imageUrl}
            onChange={setImageUrl}
          />
          {/* Hidden input keeps the server action interface unchanged */}
          <input type="hidden" name="image" value={imageUrl} />
        </div>
        <label className="block">
          <span className="eyebrow text-ivory/40">Order</span>
          <input
            name="position"
            type="number"
            defaultValue={entryPosition ?? 0}
            className={field}
          />
        </label>
      </div>

      <div className="flex flex-wrap gap-8">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={entryFeatured ?? false}
            className="h-4 w-4 accent-[#c3a15c]"
          />
          <span className="nav-type text-ivory/60">Featured</span>
        </label>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="published"
            defaultChecked={entryPublished ?? true}
            className="h-4 w-4 accent-[#c3a15c]"
          />
            <span className="nav-type text-ivory/60">Published</span>
        </label>
      </div>

      <div className="mt-12 border-t border-ivory/10 pt-12">
        <h2 className="display text-2xl mb-8">Detailed Content</h2>
        {type === "project" ? renderProjectForm() : renderGenericForm()}
      </div>

      {/* Hidden input to pass the JSON payload to the server action */}
      <input type="hidden" name="data" value={JSON.stringify(data)} />

      <div className="flex flex-wrap items-center gap-5 pt-10 pb-20">
        <button 
          disabled={jsonError}
          className="border border-gold/60 px-8 py-3 nav-type text-gold transition-colors hover:bg-gold hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save entry
        </button>
        <Link
          href={`/admin/content/${type}`}
          className="nav-type text-ivory/40 hover:text-ivory"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
