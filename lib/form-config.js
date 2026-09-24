import fs from "node:fs/promises";
import path from "node:path";

const formPath = path.join(process.cwd(), "data/form.json");

export async function getFormConfig() {
  try {
    return JSON.parse(await fs.readFile(formPath, "utf8"));
  } catch {
    return {};
  }
}
