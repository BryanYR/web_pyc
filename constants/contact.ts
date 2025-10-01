import Point from "@/assets/icons/Point.vue";
import Phone from "@/assets/icons/Phone.vue";
import Email from "@/assets/icons/Email.vue";

export const contactInfo = [
  {
    icon: Point,
    key: "main_office",        // corresponde a home.info_contact.main_office
    keyOptional: "office",     // corresponde a footer.office
    content: ["Calle Los Sauces #325", "San Isidro, Lima."],
  },
  {
    icon: Phone,
    key: "phone_center",       // corresponde a home.info_contact.phone_center
    keyOptional: "center",     // corresponde a footer.center
    content: [
      "emergency",
      "(511) 6159898 (WA) 999998889",
      "admin_center",
      "(511) 615.9800",
    ],
    strongIndex: [0, 2],
  },
  {
    icon: Email,
    key: "email",              // corresponde a home.info_contact.email
    keyOptional: "email",      // corresponde a footer.email
    content: ["emergencia@pyc.pe", "pyc@pyc.pe"],
  },
];