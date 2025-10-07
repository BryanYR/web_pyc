import { useRouter } from "vue-router";

export function useNavigation() {
  const router = useRouter();

  const navigateToSection = async (id = "", path = "/") => {
    if (!id) {
      // Si no tiene id, solo navega normal
      router.push(path);
      return;
    }

    await router.push(path);
    setTimeout(() => scrollToId(id), 300); // pequeño delay
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -50;
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return { navigateToSection };
}