"use client";

import { useMemo, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract, useWriteContract, useConnections } from "wagmi";
import Link from "next/link";

import { FILE_VAULT_ADDRESS, FILE_VAULT_ABI } from "@/lib/contract";
import { gatewayUrl } from "@/lib/gateway";

type FileStruct = {
  cid: string;
  timestamp: bigint;
};

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const connections = useConnections();
  const address = connections[0]?.accounts?.[0];

  const { mutateAsync: writeContract } = useWriteContract();

  const { data: files, refetch } = useReadContract({
    address: FILE_VAULT_ADDRESS,
    abi: FILE_VAULT_ABI,
    functionName: "getMyFiles",
    account: address,
    query: {
      enabled: Boolean(address),
    },
  }) as {
    data: FileStruct[] | undefined;
    refetch: () => Promise<any>;
  };

  const sortedFiles = useMemo(() => {
    if (!files) return [];
    // Newest first
    return [...files].sort((a, b) => Number(b.timestamp - a.timestamp));
  }, [files]);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert("No file selected!");
        return;
      }

      setUploading(true);

      const data = new FormData();
      data.set("file", file);

      const uploadRequest = await fetch("/api/files", {
        method: "POST",
        body: data,
      });

      if (!uploadRequest.ok) {
        const err = await uploadRequest.json().catch(() => null);
        throw new Error(err?.error || "API upload failed");
      }

      const { cid } = (await uploadRequest.json()) as {
        cid: string;
        url: string;
      };

      await writeContract({
        address: FILE_VAULT_ADDRESS,
        abi: FILE_VAULT_ABI,
        functionName: "addFile",
        args: [cid],
      });

      await refetch();
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-5xl px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">File Vault</h1>
            <p className="text-sm text-zinc-400">
              Upload files to IPFS and store CIDs on-chain (Sepolia)
            </p>
          </div>
          <ConnectButton />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-8">
        {/* Upload Card */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold">Upload to IPFS</h2>
              <p className="text-sm text-zinc-400">
                Choose a file, pin it on Pinata, then save the CID on-chain.
              </p>
            </div>

            <div className="text-xs text-zinc-400">
              Connected:{" "}
              <span className="text-zinc-200">
                {address
                  ? `${address.slice(0, 6)}...${address.slice(-4)}`
                  : "Not connected"}
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            {/* File input */}
            <label className="group flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 transition hover:border-white/20">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-sm font-semibold">
                  IPFS
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-medium">
                    {file ? file.name : "Choose a file"}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {file
                      ? `${(file.size / 1024).toFixed(1)} KB`
                      : "Any file type supported"}
                  </p>
                </div>
              </div>

              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <span className="rounded-lg bg-white/10 px-3 py-1 text-xs text-zinc-200 transition group-hover:bg-white/15">
                Browse
              </span>
            </label>

            {/* Upload button */}
            <button
              onClick={uploadFile}
              disabled={uploading || !address}
              className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium transition
                         bg-white text-zinc-900 hover:bg-zinc-200
                         disabled:cursor-not-allowed disabled:opacity-60"
            >
              {uploading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
                  Uploading...
                </span>
              ) : (
                "Upload"
              )}
            </button>
          </div>

          {!address && (
            <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Connect your wallet to upload and view your files.
            </div>
          )}
        </section>

        {/* Files list */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold">Your Files</h2>
              <p className="text-sm text-zinc-400">
                Stored on IPFS, referenced on-chain.
              </p>
            </div>

            <button
              onClick={() => refetch()}
              className="rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-200 transition hover:border-white/20 hover:bg-zinc-900/60"
            >
              Refresh
            </button>
          </div>

          <div className="mt-6">
            {!sortedFiles.length ? (
              <div className="rounded-xl border border-dashed border-white/15 bg-zinc-900/30 p-10 text-center">
                <p className="text-sm text-zinc-300">No files uploaded yet.</p>
                <p className="mt-1 text-xs text-zinc-500">
                  Upload your first file above — it will appear here.
                </p>
              </div>
            ) : (
              <ol className="space-y-3 list-decimal list-inside">
                {sortedFiles.map((f, i) => {
                  const ts = Number(f.timestamp) * 1000;
                  const date = new Date(ts).toLocaleString();

                  return (
                    <li
                      key={`${f.cid}-${i}`}
                      className="rounded-xl border border-white/10 bg-zinc-900/40 px-4 py-3 hover:border-white/20 transition"
                    >
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="text-xs text-zinc-400">CID</p>
                          <Link
                            href={gatewayUrl(f.cid)}
                            target="_blank"
                            rel="noopener noreferrer"
                            prefetch={false}
                            className="block truncate text-sm font-medium text-zinc-100 hover:underline"
                            title={f.cid}
                          >
                            {f.cid}
                          </Link>

                          <p className="mt-1 text-xs text-zinc-500">
                            Uploaded: {date}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={gatewayUrl(f.cid)}
                            target="_blank"
                            rel="noopener noreferrer"
                            prefetch={false}
                            className="rounded-lg bg-white/10 px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/15"
                          >
                            Open
                          </Link>

                          <a
                            href={`${gatewayUrl(f.cid)}?download=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-white/10 bg-zinc-950/40 px-3 py-2 text-xs text-zinc-200 transition hover:border-white/20"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="pb-10 text-center text-xs text-zinc-500">
          Built with Next.js • wagmi/viem • RainbowKit • Pinata • Sepolia
        </footer>
      </div>
    </main>
  );
}
