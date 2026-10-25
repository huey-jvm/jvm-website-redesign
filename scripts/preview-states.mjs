// Temporary local-only route for reviewing and testing otherwise transient UI.
import { mkdir, copyFile, rm, access } from 'node:fs/promises';
const route = new URL('../app/ui-state-preview/', import.meta.url);
if (process.argv.includes('--clean')) {
  await rm(new URL('page.tsx', route), { force: true });
  await rm(new URL('loading.tsx', route), { force: true });
  // No recursive deletion: preserve any unrelated files in this directory.
  const { rmdir } = await import('node:fs/promises');
  await rmdir(route).catch(() => {});
} else {
  try {
    await access(new URL('page.tsx', route));
    throw new Error('Preview route already exists; clean it before preparing again.');
  } catch (error) { if (error.code !== 'ENOENT') throw error; }
  await mkdir(route, { recursive: true });
  await copyFile(new URL('../tests/fixtures/state-preview.tsx', import.meta.url), new URL('page.tsx', route));
  await copyFile(new URL('../app/loading.tsx', import.meta.url), new URL('loading.tsx', route));
  console.log('Local preview: /ui-state-preview?view=loading&name=contact');
  console.log('Remove before building: node scripts/preview-states.mjs --clean');
}
