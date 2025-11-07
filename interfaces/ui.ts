export interface ButtonBaseProps {
  variant?: "solid" | "outline";
  classes?: string;
  to?: string;
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean;
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
  classTitleWrapper?: string;
  classDescriptionWrapper?: string;
}
