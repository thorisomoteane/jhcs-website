/**
 * Firebase SDK errors carry a machine-readable `code` (e.g.
 * "permission-denied", "storage/unauthorized") alongside `message`. Surfacing
 * both turns a dead-end "please try again" toast into something you can act
 * on — safe to show as-is on admin-only screens.
 */
export function describeError(err: unknown): string {
  if (err && typeof err === "object") {
    const code = "code" in err ? String((err as { code: unknown }).code) : undefined;
    const message =
      "message" in err ? String((err as { message: unknown }).message) : undefined;
    if (code && message) return `${message} (${code})`;
    if (message) return message;
  }
  return String(err);
}
