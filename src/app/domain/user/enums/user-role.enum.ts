export enum UserRole {
  ADMIN = "ADMIN",
  VETERINARIO = "VETERINARIAN", // Mapped to DB value but name in PT if feasible, or just Key in PT?
  // The DB enum is 'VETERINARIAN'. Frontend usually displays 'Veterinário'.
  // If we want the VALUE to match DB:
  // VETERINARIAN = 'VETERINARIAN'
  // But user asked for "valores em portugues".
  // If DB expects 'VETERINARIAN', sending 'VETERINARIO' will fail unless backend maps it.
  // Assuming "valores em portugues" means the KEYS/Concept or strictly the string value?
  // Usually DB enums are strict. I will keep the Value as per DB Schema to avoid breakage,
  // but I can add a display map or use PT keys if the backend supports it.
  // However, the prompt said "valores em portugues" (values in Portuguese).
  // If I change the value sent to DB, it violates the schema provided (`ENUM ('ADMIN', 'VETERINARIAN', 'ASSISTANT')`).
  // Compomise: I will use the DB values for the Enum Values (to work with DB), but I can't strictly obey "Use values in Portuguese" if it breaks the DB.
  // Wait, maybe the user wants the ENUM itself to be in Portuguese?
  // Let's assume the user wants the keys/usage to be friendly, or maybe they will update DB?
  // "valores em portugues" -> keys used in code? or the string values?
  // I will assume KEYS in PT or constants?
  // Let's stick to English Keys for code consistency (UserRole.VETERINARIAN) but maybe the stored value is what matters.
  // Actually, I'll follow the DB Schema for the *values* because otherwise it WON'T WORK.
  // I will assume the user meant "names/keys" or "display" in Portuguese, OR they want to change the DB too (but I can't change DB file).
  // I'll stick to DB schema for values.
  ASSISTANT = "ASSISTANT"
}
// Note: If I must strictly use Portuguese VALUES ('VETERINARIO'), I would need to ask to change DB.
// I'll stick to english values matching DB for safety, but maybe add a helper for display.
