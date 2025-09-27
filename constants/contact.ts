import Point from "@/assets/icons/Point.vue";
import Phone from "@/assets/icons/Phone.vue";
import Email from "@/assets/icons/Email.vue";

export const contactInfo = [
  {
    icon: Point,
    title: "Sede Principal",
    titleOptional: "Oficina",
    content: ["Calle Los Sauces #325", "San Isidro, Lima."],
  },
  {
    icon: Phone,
    title: "Central Telefónica",
    titleOptional: "Central",
    content: [
      "Emergencia 24 Horas:",
      "(511) 6159898 (WA) 999998889",
      "Central Administrativa:",
      "(511) 615.9800",
    ],
    strongIndex: [2], // marcar como <strong>
  },
  {
    icon: Email,
    title: "Correo Electrónico",
    titleOptional: "Correo",
    content: ["emergencia@pyc.pe", "pyc@pyc.pe"],
  },
];