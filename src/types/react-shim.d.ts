// Ambient declarations for React and JSX when @types/react is not installed locally


declare module 'react' {
  export type FC<P = {}> = (props: P) => any;
  export type ReactNode = any;
  export type ComponentType<P = {}> = any;
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export type ChangeEvent<T = any> = any;
  export type FormEvent<T = any> = any;
  export type MouseEvent<T = any> = any;
  export type CSSProperties = Record<string, any>;

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useRef<T>(initialValue?: T): { current: T };

  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {}
  }

  const React: any;
  export default React;
}

declare namespace React {
  export type FC<P = {}> = (props: P) => any;
  export type ReactNode = any;
  export type ComponentType<P = {}> = any;
  export type SetStateAction<S> = S | ((prevState: S) => S);
  export type Dispatch<A> = (value: A) => void;
  export type ChangeEvent<T = any> = any;
  export type FormEvent<T = any> = any;
  export type MouseEvent<T = any> = any;
  export type CSSProperties = Record<string, any>;

  export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prev: T) => T)) => void];
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps: any[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps: any[]): T;
  export function useRef<T>(initialValue?: T): { current: T };

  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {}
  }
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {}
  }
}

declare module 'react/jsx-dev-runtime' {
  export const jsxDEV: any;
  export const Fragment: any;
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element {}
  }
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | null): {
    render(children: any): void;
    unmount(): void;
  };
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
  interface Element {}
}
