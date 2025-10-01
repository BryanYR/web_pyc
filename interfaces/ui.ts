export interface ButtonBaseProps {
  variant?: "solid" | "outline";
  classes?: string;
  to?: string;
}

export interface SectionTitleProps {
  hint?: string;
  title: string;
  type?: string;
  classTitle?: string;
  classHint?: string;
}

export interface SectionInformationProps extends SectionTitleProps {
  description?: string;
  mode?: 'inline' | 'block'
  classDescription?: string;
}
