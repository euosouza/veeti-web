export interface PlaygroundConfig {
  title: string;
  description?: string;
  documentation?: {
    subtitleInput?: string;
    subtitleOutputs?: string;
    tableInputs?: {
      props: string;
      types: string;
      default: string;
      description: string;
    }[];
    tableOutputs?: {
      props: string;
      return: string;
      description: string;
    }[];
  };
  groupConfig?: {
    title: string;
    description?: string;
    tableInputs?: {
      props: string;
      types: string;
      default: string;
      description: string;
    }[];
  };
}
