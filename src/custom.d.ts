declare module "*.svg?react" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}
declare module "*.svg" {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
