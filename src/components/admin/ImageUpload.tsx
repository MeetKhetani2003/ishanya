"use client";

import { useRef, useState } from "react";

interface Props {
  label: string;
  value: string;        // current URL or empty string
  onChange: (url: string) => void;
  accept?: string;
}

export default function ImageUpload({
  label,
  value,
  onChange,
  accept = "image/*",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const upload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Upload failed (${res.status})`);
      }
      const { url } = await res.json();
      onChange(url as string);
    } catch (err: any) {
      setError(err.message ?? "Upload error");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
    // reset so same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => setDragging(false);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("");
    setError(null);
  };

  const hasImage = Boolean(value);

  return (
    <div className="block">
      <span className="eyebrow text-ivory/40 block mb-2">{label}</span>

      {/* Drop / click zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={[
          "relative mt-1 flex min-h-[140px] cursor-pointer items-center justify-center overflow-hidden border transition-colors",
          dragging
            ? "border-gold bg-gold/5"
            : hasImage
            ? "border-ivory/20 hover:border-gold/60"
            : "border-ivory/12 border-dashed hover:border-ivory/30",
        ].join(" ")}
      >
        {/* Preview */}
        {hasImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="preview"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}

        {/* Overlay content */}
        <div
          className={[
            "relative z-10 flex flex-col items-center gap-2 px-4 py-6 text-center select-none",
            hasImage ? "text-ivory" : "text-ivory/30",
          ].join(" ")}
        >
          {uploading ? (
            <>
              <Spinner />
              <span className="eyebrow text-xs">Uploading…</span>
            </>
          ) : hasImage ? (
            <>
              <UploadIcon />
              <span className="eyebrow text-xs opacity-70">Replace image</span>
            </>
          ) : (
            <>
              <UploadIcon />
              <span className="eyebrow text-xs">Click or drag &amp; drop</span>
              <span className="text-[10px] opacity-50">JPG, PNG, WEBP, SVG</span>
            </>
          )}
        </div>

        {/* Clear button */}
        {hasImage && !uploading && (
          <button
            type="button"
            onClick={handleClear}
            title="Remove image"
            className="absolute right-2 top-2 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-[#111]/80 text-ivory/60 hover:bg-red-900/80 hover:text-red-300 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

      {/* URL display */}
      {hasImage && (
        <p className="mt-1 truncate text-[10px] text-ivory/25 font-mono">{value}</p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleFileChange}
        tabIndex={-1}
      />
    </div>
  );
}

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 opacity-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
      />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="h-6 w-6 animate-spin opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
