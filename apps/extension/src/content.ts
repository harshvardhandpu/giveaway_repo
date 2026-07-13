// Public-page helper only. It neither performs nor schedules social engagement.
const text = document.body?.innerText ?? "";
if (/\b(giveaway|airdrop)\b/i.test(text)) document.documentElement.dataset.giveawayIntelligence = "candidate";
