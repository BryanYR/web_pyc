import { useRouter, useRoute } from "vue-router";

export function useNavigation() {
  const router = useRouter();
  const route = useRoute();

  const navigateToSection = async (id = "", path = "/") => {
    console.log('id', id, path)
    if (!id) {
      // Si no tiene id, solo navega normal
      router.push(path);
      return;
    }

    if (route.path === "/") {
      // Ya estamos en la página, solo scrollea
      scrollToId(id);
    } else {
      // Primero navega, luego scrollea
      await router.push(path);
      setTimeout(() => scrollToId(id), 300); // pequeño delay
    }
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