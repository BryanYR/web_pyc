// HOME
export interface PersonInfo {
    name: string;
    position: string;
    email: string;
    linkedin: string;
    photo: string;
    phone: string;
    description: string;
}

export interface DivisionInfo{
    imageUrl: string;
    title: string;
    description: string;
}

// EQUIPO
export interface InspectorList {
    specialty: string;
    qty: number;
}


// BLOG

export interface BlogPost {
  id: string
  title: string
  body: string
  publishedAt: string
}