"use client";

import { Component, type ReactNode } from "react";

interface CanvasErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
  onError?: (error: Error) => void;
}

interface CanvasErrorBoundaryState {
  failed: boolean;
}

export class CanvasErrorBoundary extends Component<
  CanvasErrorBoundaryProps,
  CanvasErrorBoundaryState
> {
  state: CanvasErrorBoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
