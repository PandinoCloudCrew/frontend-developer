function Comment({ text }: { text: string }) {
  // SAFE — React escapes the value automatically
  return <p>{text}</p>;
  // If text = "<script>alert('xss')</script>", renders as visible text
}
