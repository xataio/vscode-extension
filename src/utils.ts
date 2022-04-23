export function slugify(name: string) {
  return name.toLowerCase().split(/\W/g).filter(Boolean).join("-");
}
