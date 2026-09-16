import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Serene Heights 3D Caught Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950 text-white select-none">
          <div className="max-w-md w-full p-6 rounded-3xl bg-slate-900 border border-amber-400/40 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold font-cinzel text-amber-100">
                Serene Heights 3D Viewport
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                A rendering component encountered an unexpected state.
              </p>
            </div>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-black/40 text-left text-[11px] font-mono text-red-300 overflow-x-auto max-h-32">
                {this.state.error.message}
              </div>
            )}

            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload 3D Experience</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
