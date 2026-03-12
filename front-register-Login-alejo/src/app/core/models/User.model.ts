// core/model/user.model.ts

export interface User {
  id:        number | string;
  fullname:  string;
  username:  string;
  email:     string;
  createdAt?: string;   // fecha ISO que puede venir del back
  role?:     string;    // ej: "ADMIN" | "USER"
  avatarUrl?: string;   // opcional, si el back lo provee en el futuro
}