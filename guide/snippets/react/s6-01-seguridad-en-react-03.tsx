// DANGER — XSS vulnerability
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// SAFE — sanitized first
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
