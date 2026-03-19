import DOMPurify from 'dompurify';

function CmsContent({ rawHtml }: { rawHtml: string }) {
  // ALWAYS sanitize with DOMPurify before rendering
  const cleanHtml = DOMPurify.sanitize(rawHtml);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
