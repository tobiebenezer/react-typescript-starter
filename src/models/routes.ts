import * as React from 'react'
import { LazyRouteFunction, RouteObject } from 'react-router-dom';

/**
 * @description the aim to create this config is to have 
 * a single source for thr route defination.
 * for the property 'component' to avoid circular
 * import dependencies error..
 */

export type Iroute = {
  id: string;
  name: string;
  description?: string;
  path: string;
  exact: boolean;
  path_string: (params: any) => string;
  isPrivate?: boolean;
  isStatic?: boolean;
  element?: React.ReactNode | null; 
  Component?: React.ComponentType | null;
  ErrorBoundary?: React.ComponentType | null;
  // lazy?: LazyRouteFunction<RouteObject>;
}

export interface IRoutesConfig {
  [key:string] : Iroute;
  }