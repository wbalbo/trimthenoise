const promotedWords = [
  "promoted",             // English
  "promovido",            // Portuguese
  "promocionado",         // Spanish
  "post sponsorisé",      // French
  "promu(e) par",         // French (alternative)
  "sponsorisé",           // French (alternative 2)
  "gesponsert",           // German
  "anzeige",              // German (alternative)
  "post sponsorizzato",   // Italian
  "promosso",             // Italian (alternative)
  "продвигается",         // Russian
  "реклама",              // Russian alternative
  "marknadsfört",         // Swedish
  "marknadsfort",         // Swedish (alternative)
  "marknadsförd",         // Swedish (alternative 2)
  "marknadsford",         // Swedish (alternative 3)
  "tanıtıldı",            // Turkish
  "öne çıkarılan içerik", // Turkish (alternative) Featured content
  "プロモート",            // Japanese
  "プロモーター",          // Japanese (alternative)
  "プロモーション",        // Japanese (alternative 2)
  "광고",                 // Korean
  "광",                   // Korean (alternative)
  "推广 • 与",            // Simplified Chinese
  "广告",                 // Simplified Chinese (alternative)
  "促銷內容",             // Traditional Chinese
  "已宣傳 • 與"          // Traditional Chinese (alternative)
 ];

const normalizeText = (text) => {
  return text
     .normalize("NFKC")                          // 1. Normalize Unicode
    .replace(/[\u200B\u00A0]/g, '')              // 2. Remove zero-width and non-breaking space
    .replace(/[\u0300-\u036f]/g, '')             // 3. Remove diacritics
    .replace(/\s+/g, ' ')                        // 4. Collapse all whitespace
    .trim()                                      // 5. Trim ends
    .toLowerCase();                              // 6. Case-insensitive match
};

const hidePromotedPosts = () => {
  const posts = document.querySelectorAll('div.fie-impression-container');

  posts.forEach((post) => {
    const spans = post.querySelectorAll('span[aria-hidden="true"]');
      for (const span of spans) {
        const text = normalizeText(span.textContent || "");
        if (promotedWords.some(word => text.includes(word))) {          
          console.log("Promoted post detected:", span.innerText.trim().toLowerCase());
          post.style.display = 'none';
          break;
        }
      }
    });
  };

hidePromotedPosts();

// Setup MutationObserver to handle lazy loading
let mutationTimeout;
const observer = new MutationObserver(() => {
  clearTimeout(mutationTimeout);
  mutationTimeout = setTimeout(hidePromotedPosts, 100);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});
