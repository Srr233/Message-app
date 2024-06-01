import React, { Component, ReactNode } from "react";

const isUserLogged = (prop: any) => {
  if (prop !== undefined) return true;
};

export const LoadingHOC =
  (loadingProp: string) => (WrappedComponent: React.ComponentClass<any>) => {
    return class LoadingHOC extends Component<any, {}> {
      render(): ReactNode {
        return isUserLogged(this.props[loadingProp]) ? (
          <WrappedComponent {...this.props} />
        ) : (
          <div className="loader">LOADING</div>
        );
      }
    };
  };
