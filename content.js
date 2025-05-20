(function hideAllPromotedPosts() {
  const promotedWords = [
    "promoted",       // English
    "promovido",    // Portuguese
    "promocionado",  // Spanish
    "sponsorisé",     // French
    "gesponsert",     // German
    "sponsorizzato",  // Italian
    "реклама",        // Russian
    "sponsrad",       // Swedish
    "reklam",         // Turkish
    "スポンサー",      // Japanese
    "광고",            // Korean
    "广告",            // Simplified Chinese
    "廣告",            // Traditional Chinese
    "إعلان",           // Arabic
  ];

  function isPromoted(text) {
    if (!text) return false;
    const normalized = text.trim().toLowerCase();
    return promotedWords.some((word) => normalized.startsWith(word));
  }

  function hidePromotedPosts() {
    const spans = document.querySelectorAll('span[aria-hidden="true"]');
    
    spans.forEach((span) => {
      const text = span.innerText;
      if (isPromoted(text)) {
        let post = span;
        for (let i = 0; i < 10 && post; i++) {
          if (post.getAttribute("data-urn")?.startsWith("urn:li:activity:")) {
            break;
          }
          post = post.parentElement;
        }

        if (post && post.style && post.style.display !== "none") {
          post.style.display = "none";
          console.log("Hidden promoted post:", text);
        }
      }
    });
  }

  // Initial call
  hidePromotedPosts();

  // Watch for DOM changes
  const observer = new MutationObserver(() => hidePromotedPosts());

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();