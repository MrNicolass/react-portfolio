/**
 * Copies text to the clipboard. Falls back to a hidden textarea where the async Clipboard API
 * is missing or refused. The textarea goes inside the open modal dialog, if any, because a
 * modal makes the rest of the document inert and `select()` would fail there.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* try the fallback */
  }

  const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const host = previous?.closest("dialog[open]") ?? document.body;
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  host.append(area);

  try {
    area.select();
    return document.execCommand("copy");
  } catch {
    return false;
  } finally {
    area.remove();
    previous?.focus();
  }
}
