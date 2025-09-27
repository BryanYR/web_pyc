export interface ButtonBaseProps {
  variant?: "solid" | "outline";
  classes?: string;
  to?: string;
}

export interface SectionTitleProps {
  hint?: string;
  title: string;
  type?: string;
}

export interface SectionInformationProps extends SectionTitleProps {
  description?: string;
  mode?: 'inline' | 'block'
}
