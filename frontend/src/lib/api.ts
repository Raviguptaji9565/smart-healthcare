const rawBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!rawBaseUrl) {
    // If not configured, use relative path (Next.js rewrites proxy to backend in dev and prod)
    return normalizedPath;
  }

  // Remove trailing slashes to prevent double slashes
  const baseUrl = rawBaseUrl.replace(/\/+$/, "");
  return `${baseUrl}${normalizedPath}`;
}

