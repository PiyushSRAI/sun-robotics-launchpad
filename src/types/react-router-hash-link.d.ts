declare module "react-router-hash-link" {
  import { LinkProps, NavLinkProps } from "react-router-dom";
  import { ComponentType } from "react";

  export interface HashLinkProps extends LinkProps {
    smooth?: boolean;
    scroll?: (element: HTMLElement) => void;
    timeout?: number;
    elementId?: string;
  }

  export interface NavHashLinkProps extends NavLinkProps {
    smooth?: boolean;
    scroll?: (element: HTMLElement) => void;
    timeout?: number;
    elementId?: string;
  }

  export const HashLink: ComponentType<HashLinkProps>;
  export const NavHashLink: ComponentType<NavHashLinkProps>;
}
